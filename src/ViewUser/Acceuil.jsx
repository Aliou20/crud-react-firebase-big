import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../Firebase";

function Acceuil() {
  const [user] = useAuthState(auth);


  return (
     <>
          wELCOME
     </>
  );
}

export default Acceuil;
