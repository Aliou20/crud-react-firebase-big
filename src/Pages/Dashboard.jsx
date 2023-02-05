import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import AjoutEtudiant from "../Modals/AjoutEtudiant";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const mouth = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Main",
    "Juin",
    "Juilliet",
    "Aout",
    "Septembre",
    "Décembre",
  ];

  const [staticModal, setStaticModal] = useState(false);
  const [membres, setMembres] = useState([]);
  const [user] = useAuthState(auth);
  const [prenom, SetPrenom] = useState("");
  const [nom, SetNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [mois, setMois] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [montant, setMontant] = useState("");
  const [modifier, setModifier] = useState();
  const [filter, setFilter] = useState(mouth[new Date().getMonth()]);
  const [membreFilter, setMembreFilter] = useState([]);

  const toggleShow = () => setStaticModal(!staticModal);

  useEffect(() => {
    const q = query(collection(db, "Membres"), orderBy("prenom"));
    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), idMenbres: doc.id });
      });
      setMembres(messages);
    });
  }, []);

  // ++++++++++++++++++++++++++++++++++++++++++ Modifier un membres ===================================================================
  const handleModifier = (idMenbre) => {
    toggleShow();
    const result = membres.find(({ idMenbres }) => idMenbres === idMenbre);
    setModifier(result);
    console.log(modifier);
    SetPrenom(result.prenom);
    SetNom(result.nom);
    setAdress(result.adress);
    setDateNaissance(result.dateNaissance);
    setMois(result.mois);
    setEmail(result.email);
    setTel(result.tel);
    setMontant(result.montant);
  };

  // ====================================== supprimer un membre =================================================================
  const handleDelete = (id) => {
    deleteDoc(doc(db, "Membres", id));
  };

  // =============================================== Filter Mouth ==========================================
  useEffect(() => {
    const filterMouth = membres.filter(({ mois }) => mois === filter);
    setMembreFilter(filterMouth);
    console.log("effect ", filter);
  }, [filter]);
  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(filter);
  };

  return (
    <div>
      <div className="p-3">
        <label for="pet-select">Paiement de mois</label>
        <select
          name="pets"
          id="pet-select"
          className="d-block"
          value={filter}
          onChange={handleFilter}
        >
          {mouth.map((mouths) => (
            <option value={mouths}>{mouths}</option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <MDBBtn onClick={toggleShow} className="m-3">
          Ajouter
        </MDBBtn>
      </div>
      <AjoutEtudiant
        show={staticModal}
        setShow={setStaticModal}
        click={toggleShow}
        prenom={prenom}
        SetPrenom={SetPrenom}
        nom={nom}
        SetNom={SetNom}
        dateNaissance={dateNaissance}
        setDateNaissance={setDateNaissance}
        mois={mois}
        setMois={setMois}
        adress={adress}
        setAdress={setAdress}
        email={email}
        setEmail={setEmail}
        tel={tel}
        setTel={setTel}
        montant={montant}
        setMontant={setMontant}
        mouth={mouth}
        modifier={modifier}
      />

      {/*===================================== Table membres  ==============================================*/}

      {user && (
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Adress</th>
              <th scope="col">Montant</th>
              <th scope="col">Date de paiement</th>
              <th scope="col">Mois</th>
              <th scope="col">Téléphone</th>
              <th scope="col center-center">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {membreFilter.map(
              ({
                prenom,
                nom,
                email,
                adress,
                montant,
                datePaiement,
                tel,
                id,
                idMenbres,
                mois,
              }) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">
                          {prenom} {nom}
                        </p>
                        <p className="text-muted mb-0">{email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{adress}</p>
                  </td>
                  <td>{montant} frcs</td>
                  <td>
                    {new Date(datePaiement.seconds * 1000).toLocaleString()}
                  </td>
                  <td>{mois}</td>
                  <td>{tel}</td>
                  <td>
                    <MDBBadge color="success" pill>
                      Active
                    </MDBBadge>
                  </td>
                  <td>
                    <MDBBtn
                      color="link"
                      rounded
                      size="sm"
                      onClick={() => handleModifier(idMenbres)}
                    >
                      Modifier
                    </MDBBtn>
                    <MDBBtn
                      color="link"
                      rounded
                      size="sm"
                      onClick={() => handleDelete(idMenbres)}
                    >
                      Supprimer
                    </MDBBtn>
                    <MDBBtn color="link" rounded size="sm">
                      Bloquer
                    </MDBBtn>
                  </td>
                </tr>
              )
            )}
          </MDBTableBody>
        </MDBTable>
      )}
    </div>
  );
}

export default Dashboard;
