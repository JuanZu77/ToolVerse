import React, { Component } from "react";
import styles from "./CloudinaryUploadWidget.module.css";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "du5ppvnxp"; 
    const uploadPreset = "my_upload";

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
        
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.imageUrl({
            ...this.props.inputs,
            image: result.info.secure_url
          });

          // Se agrego el if para que no se rompa cuando no hay imagen, por ejemplo en el caso de editar
          if (document.getElementById("uploadedimage") !== null){
            document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
          }
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className={styles.save}/* "cloudinary-button" */ type="button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;