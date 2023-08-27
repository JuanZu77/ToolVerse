import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import styles from "./User.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersCreated);

  const [editData, setEditData] = useState({});

  useEffect(() => {
    try {
      dispatch(getAllUsers());
    } catch (error) {
      console.log("Error al obtener los usuarios:", error);
    }
  }, [dispatch]);

//!Quedan rastros para editar a firstName pero no afecta en nada para activar o desactivar al usuario
  const handleEditUser = (id, firstName, active) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { firstName, active },
    }));
  };

  const handleSaveUser = async (id) => {
    try {
      const editedUser = editData[id];

      if (editedUser) {
        const { firstName, active } = editedUser;
        await axios.put(`http://localhost:3001/user/${id}`, {
          firstName,
          active,
        });
        await dispatch(getAllUsers());

        setEditData((prevEditData) => {
          const updatedEditData = { ...prevEditData };
          delete updatedEditData[id];
          return updatedEditData;
        });

        new Swal({
          title: "Success",
          text: "Acción exitosa",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("Error updating", error);
      new Swal({
        title: "Error",
        text: "Hubo un error al actualizar el usuario",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleCancel = (id) => {
    setEditData((prevEditData) => {
      const updatedEditData = { ...prevEditData };
      delete updatedEditData[id];
      return updatedEditData;
    });
  };

  return (
    <div>
      <h2>Usuarios</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                {editData[user.id] ? (
                  <input
                    type="checkbox"
                    checked={editData[user.id].active}
                    onChange={() => {
                      setEditData((prevEditData) => ({
                        ...prevEditData,
                        [user.id]: {
                          ...prevEditData[user.id],
                          active: !prevEditData[user.id].active,
                        },
                      }));
                    }}
                  />
                ) : (
                  user.active ? "Si" : "No"
                )}
              </td>
              <td>
                {editData[user.id] ? (
                  <>
                    <button onClick={() => handleSaveUser(user.id)}>
                      Guardar
                    </button>
                    <button onClick={() => handleCancel(user.id)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleEditUser(user.id, user.firstName, user.active)
                    }
                  >
                    {user.active ? "Bloquear" : "Desbloquear"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;





