//importacion de funciones a la carpeta scripts
import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesas.js";

//agrega a los botones de registrar y actualizar
window.addEventListener("load", ()=>{
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
    cargarDatos();
});

//registra los valores de diferentes campos de un formulario de entrada
const registrar = () => {
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eFechaNacimiento = document.getElementById("UPDfechaNacimiento");
    let eCorreo = document.getElementById("UPDcorreo");
    let eTelefono = document.getElementById("UPDtelefono");
    let eMensaje = document.getElementById("UPDmensaje");

//valores ingresados en los diferentes campos del formulario y almacenarlo en local.
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vFechaNacimiento = eFechaNacimiento.value;
    let vCorreo = eCorreo.value;
    let vTelefono=  eTelefono.value;
    let vMensaje = eMensaje.value;
    
//agrupe las variables obtenidas anteriormente
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        fechaNacimiento: vFechaNacimiento,
        correo: vCorreo,
        telefono: vTelefono,
        Mensaje: vMensaje,
    };
//llama ka funcion registro a registrarPersona y  hace  enviar los  datos a la base de datos
    registrarPersona(objeto).then(() => {
        alert("Registrado con exito");
        cargarDatos();
    }).catch((r) => {
        alert("Algo ocurrio");
        alert(r);
    });
}
//cargo datos de collecion personas en una tabla que esta en el HTML
export const cargarDatos = () => {
    obtenerPersonas().then((personas)=>{
        let estructura = "";
        personas.forEach((persona)=>{
            estructura += "<tr>";
            estructura += "<td>" + persona.nombre + "</td>";
            estructura += "<td>" + persona.apellido + "</td>";
            estructura += "<td>" + persona.fechaNacimiento + "</td>";
            estructura += "<td>" + persona.correo + "</td>";
            estructura += "<td>" + persona.telefono + "</td>";
            estructura += "<td>" + persona.Mensaje + "</td>";
            estructura += "<td> <button id='UPD"+persona.id+"'>Actualizar </td> </button>";
            estructura += "<td> <button id='DEL"+persona.id+"'> Eliminar </td> </button>";
            estructura += "</tr>"
        });

        //asigno la estructura, HTML generada a un elemento en el documento con el ID "tbDatos"
        document.getElementById("tbDatos").innerHTML = estructura;
        personas.forEach((persona)=>{
            let boton = document.getElementById("UPD"+persona.id);
            // Aquí se recupera los campos del formulario con su ID
            boton.addEventListener("click",()=>{
                let eNombre = document.getElementById("UPDnombre");
                let eApellido = document.getElementById("UPDapellido");
                let eFechaNacimiento = document.getElementById("UPDfechaNacimiento");
                let eCorreo = document.getElementById("UPDcorreo");
                let eTelefono = document.getElementById("UPDtelefono");
                let eMensaje = document.getElementById("UPDmensaje")

                eNombre.value = persona.nombre;
                eApellido.value = persona.apellido;
                eFechaNacimiento.value = persona.fechaNacimiento;
                eCorreo.value = persona.correo;
                eTelefono.value = persona.telefono;
                eMensaje.value = persona.Mensaje;
               //envia la actualización actual en el bucle
                document.getElementById("btnActualizar").value = persona.id;
            });
            let botonDEL =document.getElementById("DEL"+persona.id);
            botonDEL.addEventListener("click",()=>{
                if(confirm("Seguro que quieres eliminar a " +persona.nombre+" "+persona.apellido)){
                    eliminarPersona(persona.id).then(()=>{
                        alert("Eliminado con exito");
                        cargarDatos();
                    })
                }   
            })
        });
    });
}
//se asigna los campos de entrada del formulario de actualización de datos
export const actualizar = () => {
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eFechaNacimiento = document.getElementById("UPDfechaNacimiento");
    let eCorreo = document.getElementById("UPDcorreo");
    let eTelefono = document.getElementById("UPDfechaNacimiento");
    let eMensaje = document.getElementById("UPDmensaje");
    
    // obtienen los valores actuales para la actualización de datos
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vFechaNacimiento = eFechaNacimiento.value;
    let vCorreo = eCorreo.value;
    let vTelefono = eTelefono.value;
    let vMensaje = eMensaje.value;
    // agrupa los valores de la actualización de datos
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        fechaNacimiento: vFechaNacimiento,
        correo: vCorreo,
        Telefono: vTelefono,
        Mensaje: vMensaje,
    };
    //identifica los valores en el servidor cuando se envían los datos actualizado
    let id = document.getElementById("btnActualizar").value;

    //actualiza la tabla que muestra los datos de los usuarios actualizados  en la interfaz de usuario.
    actualizarPersona(objeto, id).then(()=>{
        alert("Se actualizo correctamente");
        cargarDatos();
    });
}

