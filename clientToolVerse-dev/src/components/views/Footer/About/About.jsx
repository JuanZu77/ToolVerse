import React from "react";
import styles from "./About.module.css";
import Footer from "../Footer";
import arFlag from "./banderasTeam/ar.png";
import auFlag from "./banderasTeam/au.png";
import mxFlag from "./banderasTeam/mx.png";
//import peFlag from "./banderasTeam/pe.png";
import colFlag from "./banderasTeam/col.png"

const About = () => {
  const teamMembers = [
    {
      name: "Jose Antonio Flores",
      position: "Full Stack Developer",
      education: "Benemerita Universidad Autonoma de Puebla, Academia Henry",
      previousEmployment: "Ejecutivo de Banca Comercial en Citi-Banamex",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U03HZEVB12R-29f3aebacb75-512",
      linkedin: 'https://www.linkedin.com/in/antonio-flores-developer/',
      flag: mxFlag
    },
    {
      name: "Nicolás Gerardo Palma",
      position: "Full Stack Developer",
      education: "Colegio San Ramón Nonato; Academia Henry",
      previousEmployment: "Soporte técnico y vendedor autónomo",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U03UA0HP41Z-5ef929594b0f-512",
      linkedin: "https://www.linkedin.com/in/nicolas-gerardo-palma/",
      flag: arFlag
    },
    {
        name: "Sara Maria Pinzón",
        position: "Full Stack Developer",
        education: "EAN - Profesional en Lenguas Modernas; Academia Henry",
        previousEmployment: "Tutor de Abeka Academy",
        image: "https://ca.slack-edge.com/TPRS7H4PN-U04J87CDNUE-3600b0f3484a-192",
        linkedinUrl:"https://www.linkedin.com/in/sara-pinzon-01548192/",
        flag: colFlag
    },
    {
name: "Cecilia Moroni",
      position: "Full Stack Developer",
      education: "Facultad de Ciencias Químicas, UCC; Academia Henry",
      previousEmployment: "Bioquímicaw",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U04AVPPM86L-a19469d765bd-512",
      linkedinUrl: "https://www.linkedin.com/in/cecilia-moroni/",
      flag: auFlag
    },
    {
      name: "Daniel Alejandro Quintero Carrillo",
      position: "Full Stack Developer",
      education: "Ingeniero Industrial, Academia Henry",
      previousEmployment: "Gerente de Operaciones, Tolder S.A",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U042BPPD04D-c232b318a492-512",
      linkedinUrl: "https://www.linkedin.com/in/daniel-quintero-8127b5a3/",
      flag: arFlag
    },
    {
      name: "Juan Zubiri",
      position: "Full Stack Developer",
      education: "educativas: EEMPI 8098, Instituto superior santo Domingo, Academia Henry.",
      previousEmployment: "Gestión de la producción en IMG Textil SRL",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U04J3N98T2M-d3527c16c481-192",
      linkedinUrl: "https://www.linkedin.com/in/juan-zubiri/?originalSubdomain=ar",
      flag: arFlag
    },
  ];

  function sortTeamMembers(teamMembers) {
    const sortedArray = [...teamMembers];
    sortedArray.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedArray
  };

  return (
    <div className={styles.ourTeamSection}>
      <h3 className={styles.ourTeamTitle}>Nuestro Equipo</h3>
      <div className={styles.teamMembersContainer}>
        {sortTeamMembers(teamMembers).map((member, index) => (
          <div id={`child-${index}`} onClick={() => member.linkedin && window.open(member.linkedin, '_blank')} key={index} className={styles.teamMember}>

            <img className={styles.memberImage} src={member.image} alt={member.name} />
            <img style={{
              position: "relative",
              left: "10rem",
              width: "9rem",
              height: "auto",
              marginTop: "15px"
            }} src={member.flag} alt={member.name} />
            <div className={styles.memberDetails}>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberPosition}>{member.position}</p>
              <p className={styles.memberEducation}>Escolaridad: {member.education}</p>
              <p className={styles.memberEmployment}>Trayectoria Reelevante: {member.previousEmployment}</p>

            </div>

          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default About;

