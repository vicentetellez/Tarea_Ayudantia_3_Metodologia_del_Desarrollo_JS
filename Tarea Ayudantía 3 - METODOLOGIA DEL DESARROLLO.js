// Tarea: completar CRUD simulado de alumnos usando arrays

const readline = require("readline");

const ASIGNATURA = "Metodologias de Desarrollo";

const alumnos = [
  { id: 1, nombre: "Ana Perez", email: "ana@correo.com", seccion: "A" },
  { id: 2, nombre: "Luis Soto", email: "luis@correo.com", seccion: "B" },
  { id: 3, nombre: "Marta Diaz", email: "marta@correo.com", seccion: "A" },
];

let siguienteId = 4;

// 1) Crear alumno
function crearAlumno(nombre, email, seccion) {
  //TODO: crear objeto con id unico
  //TODO: guardarlo en alumnos
  //TODO: retornar el alumno creado
  const nuevoAlumno = {
    id: siguienteId,
    nombre: "Vicente Tellez",
    email: "vicente@correo.com",
    seccion: "A",
  };
  alumnos.push(nuevoAlumno);
  siguienteId += 1;
  return (nuevoAlumno);
}

// 2) Listar alumnos
function listarAlumnos() {
  //TODO: retornar el arreglo completo
  return (alumnos);
}

// 3) Obtener alumno por id
function obtenerAlumnoPorId(id) {
  //TODO: buscar y retornar alumno por id
  return (alumnos.find((alumnos) => alumnos.id === id));
}


// 4) Actualizar alumno por id
function actualizarAlumno(id, datosActualizados) {
  //TODO: encontrar alumno por id
  //TODO: si no existe, retornar null
  //TODO: actualizar solo campos enviados (nombre, email, seccion)
  //TODO: retornar alumno actualizado

    const alumno = obtenerAlumnoPorId(id);
    if (!alumno){
        return(null);
    } 
    if (datosActualizados.nombre !== undefined){
        alumno.nombre = datosActualizados.nombre;
    }
    if (datosActualizados.email !== undefined){
        alumno.email = datosActualizados.email;
    }
    if (datosActualizados.seccion !== undefined){
        alumno.seccion = datosActualizados.seccion;
    }
    return (alumno);
}

// 5) Eliminar alumno por id
function eliminarAlumno(id) {
  //TODO: buscar indice por id
  //TODO: si no existe, retornar false
  //TODO: eliminar del arreglo
  //TODO: retornar true
  const indice = alumnos.findIndex((alumnos) => alumnos.id === id);
  if (indice === -1){
    return (false);
  }
  alumnos.splice(indice, 1);
  return (true);
}

// =========================
// Ejemplo de menu con switch-case
// =========================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

function toNumber(valor) {
  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
}

function mostrarMenu() {
  console.log("\n=== MENU TAREA CRUD ===");
  console.log("Asignatura:", ASIGNATURA);
  console.log("1) Listar alumnos");
  console.log("2) Crear alumno");
  console.log("3) Buscar alumno por id");
  console.log("4) Editar alumno");
  console.log("5) Eliminar alumno");
  console.log("6) Buscar por seccion");
  console.log("0) Salir");
}

async function ejecutarMenu() {
  let continuar = true;

  while (continuar) {
    mostrarMenu();
    const opcion = await preguntar("Selecciona una opcion: ");

    switch (opcion) {
      case "1": {
        const lista = listarAlumnos();
        if (!Array.isArray(lista)) {
          console.log("TODO: completar listarAlumnos().");
          break;
        }
        console.table(lista);
        break;
      }

      case "2": {
        const nombre = await preguntar("Nombre: ");
        const email = await preguntar("Email: ");
        const seccion = await preguntar("Seccion: ");

        const nuevoAlumno = crearAlumno(nombre, email, seccion);
        console.log("Resultado de crearAlumno():", nuevoAlumno);
        break;
      }

      case "3": {
        const id = toNumber(await preguntar("ID a buscar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const alumno = obtenerAlumnoPorId(id);
        console.log("Resultado de obtenerAlumnoPorId():", alumno);
        break;
      }

      case "4": {
        const id = toNumber(await preguntar("ID a editar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const nombre = await preguntar("Nuevo nombre (Enter para mantener): ");
        const email = await preguntar("Nuevo email (Enter para mantener): ");
        const seccion = await preguntar("Nueva seccion (Enter para mantener): ");

        const datosActualizados = {};
        if (nombre) datosActualizados.nombre = nombre;
        if (email) datosActualizados.email = email;
        if (seccion) datosActualizados.seccion = seccion;

        const actualizado = actualizarAlumno(id, datosActualizados);
        console.log("Resultado de actualizarAlumno():", actualizado);
        break;
      }

      case "5": {
        const id = toNumber(await preguntar("ID a eliminar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const eliminado = eliminarAlumno(id);
        console.log("Resultado de eliminarAlumno():", eliminado);
        break;
      }
      

      case "6": {
        const sec = await preguntar("Seccion: ");
        if (sec === null) {
          console.log("Seccion invalida.");
          break;
        }
        console.log(`Alumnos de la seccion ${sec}: `);
        console.table(buscarAlumnosPorSeccion(sec));
        break;
      }

      case "0": {
        continuar = false;
        console.log("Saliendo del programa...");
        break;
      }

      default: {
        console.log("Opcion no valida.");
      }
    }
  }

  rl.close();
}

function buscarAlumnosPorSeccion(seccion){
    const alumnosMismaSeccion = [];
    for (let i = 0; i < alumnos.length; i++){
      if (alumnos[i].seccion === seccion){
        alumnosMismaSeccion.push(alumnos[i]);
      }
    }
    return (alumnosMismaSeccion);
}
ejecutarMenu();

// Desafio extra opcional:
// function buscarAlumnosPorSeccion(seccion) {
//   //TODO
// }
