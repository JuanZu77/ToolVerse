require("dotenv").config();
const {Product} = require("../db");
const {Op} = require("sequelize");


const getAllProducts = async(req, res) => {
    try {
        const products = await Product.findAll({
          order: [["id", "ASC"]]
        });
        return res.status(200).json(products);
    } catch (error) {
        res.status(404).json({error: "Products not found"});
    }
};

const getProductById = async(req, res) => {

    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(404).json({error: "Product not found"});
    }
};

const getProductByName = async(req, res) => {

    const {name} = req.query;
    try {

    const searchValues = name.split(" ");
    const whereClause = searchValues.map(searchValue => ({
        [Op.or]: [
              {
                name: {
                    [Op.iLike]: `%${searchValue}%`
                }
              },
              {
                brand: {
                    [Op.iLike]: `%${searchValue}%`
                }
              }
           ]
          }));

          const product = await Product.findAll({
              where: {
                  [Op.and]: whereClause
              },
          });
          res.status(200).json(product)

      } catch (error) {
          res.status(404).json({error: "Product not found"});
      }
};
  

//POST
const createProducts = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      // Si no se proporciona ningún dato en el cuerpo de la solicitud.
      return res.status(400).json({ error: 'Data not provided' });
    }

    // Validar que los atributos no estén vacíos.
    for (const key in data) {
      if (data[key] === null || data[key] === undefined || data[key] === '') {
        return res.status(400).json({ error: `Attribute '${key}' cannot be empty` });
      }
    }

    // Obtener el último ID utilizado en la base de datos.
    const lastProduct = await Product.findOne({
      order: [['id', 'DESC']], // Ordenar en orden descendente según el ID
    });

    // Generar un nuevo ID que no exista previamente.
    const newProductId = lastProduct ? lastProduct.id + 1 : 1;

    // Asignar el nuevo ID al objeto de datos antes de crear el producto.
    data.id = newProductId;

    // Si se envía un arreglo de objetos, crearemos varios productos a la vez.
    if (Array.isArray(data)) {
      const createdProducts = await Product.bulkCreate(data);
      return res.status(201).json(createdProducts);
    } else {
      // Si se envía un solo objeto, crearemos un solo producto.
      const createdProduct = await Product.create(data);
      return res.status(201).json(createdProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product(s)' });
  }
};

//PUT
const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const data = req.body;
  
      if (!data) {
        // Si no se proporciona ningún dato en el cuerpo de la solicitud.
        return res.status(400).json({ error: 'Data not provided' });
      }
  
      // Validar que los atributos no estén vacíos.
      for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === '') {
          return res.status(400).json({ error: `Attribute '${key}' cannot be empty` });
        }
      }
  
      // Buscar el producto por su ID.
      const product = await Product.findByPk(productId);
  
      if (!product) {
        // Si no se encuentra el producto con el ID proporcionado.
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Actualizar los atributos del producto con los nuevos datos.
      await product.update(data);
  
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not exist' });
    }

    // Eliminar el producto de la base de datos.
    await product.destroy();

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProducts,
    updateProduct, 
    deleteProduct
};





