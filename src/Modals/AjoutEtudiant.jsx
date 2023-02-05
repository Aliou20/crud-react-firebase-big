import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { db } from "../Firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

function AjoutEtudiant({
  show,
  setShow,
  click,
  nom,
  SetNom,
  prenom,
  SetPrenom,
  dateNaissance,
  setDateNaissance,
  mois,
  setMois,
  adress,
  setAdress,
  email,
  setEmail,
  tel,
  setTel,
  montant,
  setMontant,
  mouth,
  modifier,
}) {
  const [user] = useAuthState(auth);

  // ====================================== Ajout de menbre ==========================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "Membres"), {
      prenom,
      nom,
      dateNaissance,
      mois,
      adress,
      email,
      tel,
      montant,
      id: user.uid,
      datePaiement: serverTimestamp(),
    });
    SetNom("");
    SetPrenom("");
    setDateNaissance("");
    setMois("");
    setAdress("");
    setEmail("");
    setTel("");
    setMontant("");
    toast.success("Membres ajoutez", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      document.location.reload();
    }, "2000");
  };

  // ======================================= Modifier un membres ==================================================================

  const handleModifier = (e) => {
    e.preventDefault();

    const washingtonRef = doc(db, "Membres", modifier.idMenbres);
    updateDoc(washingtonRef, {
      prenom,
      nom,
      dateNaissance,
      mois,
      adress,
      email,
      tel,
      montant,
    });
    SetNom("");
    SetPrenom("");
    setDateNaissance("");
    setMois("");
    setAdress("");
    setEmail("");
    setTel("");
    setMontant("");
    toast.success("Membres modifier avec succes", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      document.location.reload();
    }, "2000");
  };

  const dataForm = [
    {
      label1: "Prenom",
      type1: "text",
      value1: prenom,
      change1: SetPrenom,
      label2: "Nom",
      type2: "text",
      value2: nom,
      change2: SetNom,
    },
    {
      label1: "Date de naissance",
      type1: "date",
      value1: dateNaissance,
      change1: setDateNaissance,
      label2: "Mois de paiement",
      type2: "",
      value2: mois,
      change2: setMois,
    },
    {
      label1: "Address",
      type1: "text",
      value1: adress,
      change1: setAdress,
      label2: "Email",
      type2: "email",
      value2: email,
      change2: setEmail,
    },
    {
      label1: "Telephone",
      type1: "tel",
      value1: tel,
      change1: setTel,
      label2: "Montant",
      type2: "number",
      value2: montant,
      change2: setMontant,
    },
  ];
  return (
    <MDBModal staticBackdrop tabIndex="-1" show={show} setShow={setShow}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Ajouter un menbre</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={click}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form>
              {dataForm.map(
                (
                  {
                    label1,
                    type1,
                    value1,
                    change1,
                    label2,
                    type2,
                    value2,
                    change2,
                  },
                  index
                ) => (
                  <>
                    <MDBRow className="mb-4" key={index}>
                      <MDBCol>
                        <MDBInput
                          id="form6Example1"
                          label={label1}
                          type={type1}
                          value={value1}
                          onChange={(e) => change1(e.target.value)}
                        />
                      </MDBCol>
                      <MDBCol>
                        {value2 !== mois && change2 !== setMois ? (
                          <MDBInput
                            id="form6Example2"
                            label={label2}
                            type={type2}
                            value={value2}
                            onChange={(e) => change2(e.target.value)}
                          />
                        ) : (
                          <label>
                            {label2}:
                            <select
                              value={value2}
                              onChange={(e) => change2(e.target.value)}
                            >
                              {mouth.map((mouths) => (
                                <>
                                  <option value={mouths}>{mouths}</option>
                                </>
                              ))}
                            </select>
                          </label>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </>
                )
              )}
              <MDBBtn
                className="mb-4"
                type="submit"
                block
                onClick={handleSubmit}
              >
                Envoyer
              </MDBBtn>
              <MDBBtn
                className="mb-4"
                type="submit"
                block
                onClick={handleModifier}
              >
                Modifier
              </MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </MDBModal>
  );
}

export default AjoutEtudiant;
