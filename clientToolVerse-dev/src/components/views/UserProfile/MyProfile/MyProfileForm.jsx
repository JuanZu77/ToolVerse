import styles from "./MyProfileForm.module.css"

const MyProfileForm = ({ handleSubmit, handleChange, formProfile, error }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="firstName">Nombre:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Ingresa tu nombre"
              value={formProfile.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={formProfile.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={formProfile.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="text"
              name="phone"
              placeholder="Ingresa tu teléfono"
              value={formProfile.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.button}>
          <input type="submit" value="Confirmar" />
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default MyProfileForm;
