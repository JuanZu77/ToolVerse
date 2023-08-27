import styles from "./MyAddressForm.module.css"
const MyAddressForm = ({
  handleSubmit,
  handleSubmitModify,
  handleChange,
  handleChangeModify,
  formAddress,
  error,
  modifyAddress,
  handleCancel,
}) => {
  return (
    <div>
      <form
        onSubmit={modifyAddress !== null ? handleSubmitModify : handleSubmit}
      >
        <div>
          <br></br>
          <div>
            <label htmlFor="country">Pais:</label>
            <input
              type="text"
              name="country"
              placeholder="Ingresa tu país"
              value={
                modifyAddress !== null
                  ? modifyAddress.country
                  : formAddress.country
              }
              onChange={
                modifyAddress !== null ? handleChangeModify : handleChange
              }
            />
          </div>
          <div>
            <label htmlFor="state">Estado:</label>
            <input
              type="text"
              name="state"
              placeholder="Ingresa tu estado"
              value={
                modifyAddress !== null ? modifyAddress.state : formAddress.state
              }
              onChange={
                modifyAddress !== null ? handleChangeModify : handleChange
              }
            />
          </div>
          <div>
            <label htmlFor="city">Ciudad:</label>
            <input
              type="text"
              name="city"
              placeholder="Ingresa tu ciudad"
              value={
                modifyAddress !== null ? modifyAddress.city : formAddress.city
              }
              onChange={
                modifyAddress !== null ? handleChangeModify : handleChange
              }
            />
          </div>
          <div>
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              name="address"
              placeholder="Ingresa tu dirección"
              value={
                modifyAddress !== null
                  ? modifyAddress.address
                  : formAddress.address
              }
              onChange={
                modifyAddress !== null ? handleChangeModify : handleChange
              }
            />
          </div>
          <div>
            <label htmlFor="postalCode">Código Postal:</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Ingresa tu código postal"
              value={
                modifyAddress !== null
                  ? modifyAddress.postalCode
                  : formAddress.postalCode
              }
              onChange={
                modifyAddress !== null ? handleChangeModify : handleChange
              }
            />
          </div>
        </div>

        <div className={styles.button}>
          <input type="submit" value="Confirmar" />
          {modifyAddress && <button className={styles.button2} onClick={handleCancel}>Cancelar</button>}
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default MyAddressForm;
