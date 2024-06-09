//está importando funciones específicas del SDK de Firebase Firestore
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

// registrar un nuevo en una colección de Firestore llamada "persona".
export const registrarPersona = async (persona) => {
    console.log("persona");
    console.log(persona);
    const docRef = await addDoc(collection(db, "persona"), persona);
    return docRef;
}

//recuperar todos los documentos "persona" en Firestore y devolverlos en forma de una lista
export const obtenerPersonas = async()=>{
    const ref=collection(db,"persona");
    const querySnap=await getDocs(ref);
    console.log(querySnap);
    let listado = []
    querySnap.forEach(doc => {
        listado.push({...doc.data(),id:doc.id});
    });
    return listado;
}
//toma nuevos datos y un ID de la BS y actualiza el documento en Firestore
export const actualizarPersona = async(objeto,id)=>{
    const ref=doc(db,"persona",id);
    await updateDoc(ref,objeto);
}
export const eliminarPersona = async(id)=>{
    const ref = doc (db,"persona",id);
    await deleteDoc(ref)
}