import React, { useState } from "react";
import {
     MDBBtn,
     MDBCheckbox,
     MDBCol,
     MDBIcon,
     MDBInput,
     MDBRow,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();
     const navigate = useNavigate();
     const [user] = useAuthState(auth)

     //   Connexion email / passsword
     const connexion = (e) => {
          e.preventDefault();
          signInWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                    console.log(user.uid);
                    const washingtonRef = doc(db, "users", user.uid);

                    updateDoc(washingtonRef, {
                         password: password,
                         confirmPassword : password
                    });
                    toast.success("Utilisateur connecté", {
                         position: "top-center",
                         autoClose: 5000,
                         hideProgressBar: false,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                         theme: "colored",
                    });
                    setTimeout(() => {
                         navigate("/acceuil");
                    }, "1000");
               })
               .catch((error) => {
                    if (error.code === "auth/user-not-found") {
                         toast.error("Email incorrect", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                         });
                    } else if (error.code === "auth/wrong-password") {
                         toast.error("Mot de pass incorrect", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                         });
                    }
               });
     };

     return (
          <div className="login">
               <form className="form" onSubmit={connexion}>
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
                    <MDBInput
                         className="mb-4"
                         type="password"
                         id="form7Example2"
                         label="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                    />

                    <MDBRow className="mb-4">
                         <MDBCol className="d-flex justify-content-center">
                              <MDBCheckbox
                                   id="form7Example3"
                                   label="Remember me"
                                   defaultChecked
                              />
                         </MDBCol>
                         <MDBCol>
                              <Link to="/oublier">Mot de passe oublier</Link>
                         </MDBCol>
                    </MDBRow>

                    <MDBBtn type="submit" className="mb-4" block>
                         se connecter
                    </MDBBtn>

                    <div className="text-center">
                         <p>
                              Vous avez pas de compte? <Link to="/registe">incriver-vous</Link>
                         </p>
                    </div>
                    <div className="text-center mb-3">
                         <MDBBtn floating color="white" className="mx-1">
                              <MDBIcon fab icon="facebook-f" />
                         </MDBBtn>

                         <MDBBtn floating color="white" className="mx-1">
                              <MDBIcon fab icon="google" />
                         </MDBBtn>

                         <MDBBtn floating color="white" className="mx-1">
                              <MDBIcon fab icon="twitter" />
                         </MDBBtn>

                         <MDBBtn floating color="white" className="mx-1">
                              <MDBIcon fab icon="github" />
                         </MDBBtn>
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

export default Login;
