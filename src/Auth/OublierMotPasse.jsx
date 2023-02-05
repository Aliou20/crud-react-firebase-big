import React, { useState } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../Firebase";

function OublierMotPasse() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(auth);

  const oublier = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Vérifier votre mail", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEmail("");
        setTimeout(() => {
          navigate("/");
        }, "4000");
      })
      .catch((error) => {
        toast.error("Vous avez pas de compte", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="oublier">
      <form className="form" onSubmit={oublier}>
        <div className="text-center mb-3">
          <h1>Connexion</h1>
        </div>
        <MDBInput
          className="mb-4"
          type="email"
          id="form7Example1"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <MDBBtn type="submit" className="mb-4" block>
          Envoyer
        </MDBBtn>

        <div className="text-center">
          <p>
            Vous avez de compte? <Link to="/login">incriver-vous</Link>
          </p>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default OublierMotPasse;
