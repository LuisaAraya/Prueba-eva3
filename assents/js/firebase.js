//Importacion de las funciones para el desarrolo web
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//IMPORTAR LA CONFIGURACION DE LA FIREBASE DESDE LA CARPETA CREDENCIALES.JS
import { firebaseConfig } from "./credenciales";


//EXPORTA LOS DATOS A LA APP LOCALIZADA EN FIREBASE
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);