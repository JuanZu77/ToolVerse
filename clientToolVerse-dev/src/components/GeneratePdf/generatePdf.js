import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function generatePdf(user, shippingAddress, trolley, idPago, formaPago, status, orderId) {
    var doc = new jsPDF('p', 'pt');
    console.log('el user', user)
    console.log('la shippingAddres', shippingAddress)
    console.log('el trolley', trolley)
    const calculateTotal = () => {
        let suma = 0;
        trolley.forEach((product) => {
            suma = suma + product.product.price * product.quantity;
        });
        suma = parseFloat(suma.toFixed(2));
        return suma;
    };

    let total = calculateTotal(trolley)
    console.log('el total', total)

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(40, 50, "TOOLVERSE - Orden de Compra");

    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    doc.text(40, 80, "Envío a:");
    doc.text(40, 100, "" + user.firstName + " " + user.lastName);
    doc.text(40, 120, "" + user.email + "  Teléfono: " + user.phone);
    doc.text(40, 160, "" + shippingAddress.address + " " + shippingAddress.postalCode);
    doc.setFontSize(12);
    doc.text(40, 180, "" + shippingAddress.city + ". " + shippingAddress.state + ". " + shippingAddress.country);
    doc.setFont("courier", "bold");
    doc.text(40, 220, "Total: $" + total)
    doc.text(40, 240, "Número de orden " + formaPago + ": " + orderId)
    doc.text(40, 260, "Nro pago: " + idPago)

    var data = []
    trolley.forEach((element) => {
        let product = {
            id: element.id,
            product: element.product.name,
            quantity: element.quantity,
            price: element.product.price,
        }
        data.push(product)
    })

    autoTable(doc, {
        margin: { top: 300 },
        body: data,
        columns: [
            { header: 'id', dataKey: 'id' },
            { header: 'Producto', dataKey: 'product' },
            { header: 'Cantidad', dataKey: 'quantity' },
            { header: 'Precio', dataKey: 'price' },
        ],
    })

    doc.save("ToolVersePurchaseOrder.pdf")
}