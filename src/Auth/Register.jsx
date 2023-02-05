import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { MDBBtn, MDBCheckbox, MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../Firebase";
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    // s'incrire firebase auth email / password
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          //    Send the data to firestore
          setDoc(doc(db, "users", user.uid), {
            name,
            firstName,
            email,
            password,
            confirmPassword,
            id: user.uid,
          });
          setName("");
          setFirstName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          toast.success("Utilisateur inscrit", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/");
        })
        .catch((error) => {
          toast.error("Cet email a déjà un compte", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error(
        "Les champs passsword et confirmer votre mot de pass doivent etre identiques",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="register">
      <form className="form shadow-ms" onSubmit={register}>
        <div className="text-center mb-3">
          <h1 className="mt-4">S'incrire</h1>
        </div>

        <MDBInput
          className="mb-4"
          id="form8Example1"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <MDBInput
          className="mb-4"
          id="form8Example2"
          label="Prenom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <MDBInput
          className="mb-4"
          type="email"
          id="form8Example3"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form8Example4"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form8Example5"
          label="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <MDBCheckbox
          wrapperClass="d-flex justify-content-center mb-4"
          id="form8Example6"
          label="I have read and agree to the terms"
          defaultChecked
        />

        <MDBBtn type="submit" className="mb-4" block>
          S'inscrire
        </MDBBtn>
        <div className="text-center">
          <p>
            Si vous avez  un compte <Link to="/">connecter-vous</Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
