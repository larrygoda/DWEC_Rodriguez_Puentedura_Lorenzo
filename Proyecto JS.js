// Clase Direccion que representa los datos básicos de una dirección
class Direccion {
  // Atributos de la clase Dirección
  calle;
  numero;
  piso;
  codPostal;
  provincia;
  localidad;

  // Constructor de la clase Dirección que inicializa los atributos
  constructor(calle, numero, piso, codPostal, provincia, localidad) {
    this.calle = calle;
    this.numero = numero;
    this.piso = piso;
    this.codPostal = codPostal;
    this.provincia = provincia;
    this.localidad = localidad;
  }

  // Método para mostrar la dirección completa en forma de cadena
  mostrarDireccion() {
    return (
      "Calle: " + this.calle +
      ", Numero: " + this.numero +
      ", Piso: " + this.piso +
      ", Localidad: " + this.localidad +
      ", Provincia: " + this.provincia +
      ", CP: " + this.codPostal
    );
  }
}

// Clase Persona que hereda de la clase Dirección y añade atributos específicos de una persona
class Persona extends Direccion {
  // Atributos específicos de la clase Persona
  id;
  nombre;
  edad;

  // Constructor de la clase Persona que llama al constructor de Dirección usando `super()`
  constructor(id, nombre, edad, direccion) {
    super(direccion.calle, direccion.numero, direccion.piso, direccion.codPostal, direccion.provincia, direccion.localidad);
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
  }

  // Métodos getter para obtener los valores de los atributos privados
  get getID() {
    return this.id;
  }
  get getNombre() {
    return this.nombre;
  }
  get getEdad() {
    return this.edad;
  }

  // Método para mostrar los datos básicos del estudiante
  datosEstudiante() {
    return "ID: " + this.id + ", Nombre: " + this.nombre + ", Edad: " + this.edad;
  }
}

// Clase Estudiante que hereda de Persona y añade funcionalidades específicas
class Estudiante extends Persona {
  asignaturas; // Objeto para almacenar las asignaturas y sus notas
  matriculas;  // Objeto para registrar las fechas de matrícula de asignaturas

  // Constructor que inicializa los atributos específicos de Estudiante
  constructor(id, nombre, edad, direccion) {
    super(id, nombre, edad, direccion);
    this.asignaturas = {};
    this.matriculas = {};
  }

  // Método para matricular un estudiante en una asignatura
  matricular(asignatura, fecha) {
    if (!this.asignaturas[asignatura]) {
      this.asignaturas[asignatura] = [];
      this.matriculas[asignatura] = fecha;
      console.log(`${this.nombre} matriculado en ${asignatura} el ${fecha}`);
    } else {
      console.log(`${this.nombre} ya está matriculado en ${asignatura}`);
    }
  }

  // Método para desmatricular al estudiante de una asignatura
  desmatricular(asignatura) {
    if (this.asignaturas[asignatura]) {
      delete this.asignaturas[asignatura];
      delete this.matriculas[asignatura];
      console.log(`${this.nombre} desmatriculado de ${asignatura}`);
    } else {
      console.log(`${this.nombre} no está matriculado en ${asignatura}`);
    }
  }

  // Método para agregar una nota a una asignatura
  agregarNotas(asignatura, nota) {
    if (this.asignaturas[asignatura]) {
      if (nota >= 0 && nota <= 10) {
        this.asignaturas[asignatura].push(nota);
        console.log(`Nota ${nota} añadida en ${asignatura}`);
      } else {
        console.log("La calificación debe estar entre 0 y 10.");
      }
    } else {
      console.log(`No está matriculado en la asignatura ${asignatura}`);
    }
  }

  // Método para calcular la nota media de una asignatura específica
  calculaNotaMediaAsignaturas(asignatura) {
    const notas = this.asignaturas[asignatura];
    if (notas && notas.length > 0) {
      const suma = notas.reduce((total, nota) => total + nota, 0);
      return (suma / notas.length).toFixed(2);
    }
    return "No hay notas en esta asignatura.";
  }

  // Método para calcular la nota media de todas las asignaturas
  calculaNotaMediaTotal() {
    const todasLasNotas = Object.values(this.asignaturas).flat();
    if (todasLasNotas.length > 0) {
      const suma = todasLasNotas.reduce((total, nota) => total + nota, 0);
      return (suma / todasLasNotas.length).toFixed(2);
    }
    return "No hay notas.";
  }

  // Método para mostrar la información completa del estudiante
  infoDelEstudiante() {
    return super.datosEstudiante() + ", Asignaturas: " + JSON.stringify(this.asignaturas);
  }
}
// Clase Asignatura que representa una materia en la que los estudiantes pueden matricularse
class Asignatura {
  // Atributos de la clase Asignatura
  nombre;        // Nombre de la asignatura
  calificaciones; // Array para almacenar las calificaciones de los estudiantes en esta asignatura

  // Constructor que inicializa los atributos
  constructor(nombre) {
    this.nombre = nombre;
    this.calificaciones = [];
  }

  // Método para agregar una calificación a la asignatura
  agregarCalificacion(calificacion) {
    if (calificacion >= 0 && calificacion <= 10) {
      this.calificaciones.push(calificacion);
    } else {
      console.log("Calificación fuera de rango.");
    }
  }

  // Método para calcular el promedio de las calificaciones
  calculaMediaCalificaciones() {
    if (this.calificaciones.length > 0) {
      const suma = this.calificaciones.reduce((total, calif) => total + calif, 0);
      return (suma / this.calificaciones.length).toFixed(2);
    }
    return "No hay calificaciones.";
  }
}

// Clase SistemaGestionAcademica que centraliza la gestión de estudiantes y asignaturas
class SistemaGestionAcademica {
  constructor() {
    this.estudiantes = []; // Array para almacenar objetos de tipo Estudiante
  }

  // Método para agregar un estudiante al sistema
  agregarEstudiante(estudiante) {
    // Verifica si ya existe un estudiante con el mismo ID
    if (!this.estudiantes.some((estu) => estu.id === estudiante.id)) {
      this.estudiantes.push(estudiante);
      console.log(`Estudiante ${estudiante.nombre} agregado.`);
    } else {
      console.log("El estudiante ya existe.");
    }
  }

  // Método para eliminar un estudiante del sistema mediante su ID
  eliminarEstudiante(id) {
    const index = this.estudiantes.findIndex((estu) => estu.id === id);
    if (index !== -1) {
      console.log(`Estudiante ${this.estudiantes[index].nombre} eliminado.`);
      this.estudiantes.splice(index, 1);
    } else {
      console.log("Estudiante no encontrado.");
    }
  }

  // Método para listar todos los estudiantes registrados en el sistema
  listarEstudiantes() {
    this.estudiantes.forEach((estudiante) => {
      console.log(estudiante.infoDelEstudiante());
    });
  }

  // Método para generar un reporte con información detallada de los estudiantes y sus asignaturas
  generarReporte() {
    this.estudiantes.forEach((estudiante) => {
      console.log(estudiante.infoDelEstudiante());
      Object.keys(estudiante.asignaturas).forEach((asignatura) => {
        console.log(
          `  Asignatura: ${asignatura}, Promedio: ${estudiante.calculaNotaMediaAsignaturas(asignatura)}`
        );
      });
    });
  }
}

// Bloque para inicializar y probar el sistema de gestión académica

// Crear el sistema de gestión académica
const sistema = new SistemaGestionAcademica();
// Crear direcciones para los estudiantes
const direccion1 = new Direccion("Calle curro cuchares", "7", "2A", "18014", "Granada", "Granada");
const direccion2 = new Direccion("Calle perete", "56", "3B", "18014", "Granada", "Granada");

// Crear estudiantes con sus datos y direcciones
const estudiante1 = new Estudiante("12345678k", "Juan Pérez", 20, direccion1);
const estudiante2 = new Estudiante("13579246k", "María López", 22, direccion2);

// Agregar estudiantes al sistema
sistema.agregarEstudiante(estudiante1);
sistema.agregarEstudiante(estudiante2);

// Mostrar estudiantes registrados en el sistema
console.log("\n" + "--- Estudiantes registrados ---");
sistema.listarEstudiantes();

// Matricular estudiantes en asignaturas
console.log("\n" + "--- Matriculación de asignaturas ---");
estudiante1.matricular("Matemáticas", "2024-01-15");
estudiante1.matricular("Historia", "2024-01-20");
estudiante2.matricular("Química", "2024-02-10");

// Agregar notas a las asignaturas
console.log("\n" + "--- Agregar notas ---");
estudiante1.agregarNotas("Matemáticas", 8);
estudiante1.agregarNotas("Matemáticas", 9);
estudiante1.agregarNotas("Historia", 7);
estudiante2.agregarNotas("Química", 10);
estudiante2.agregarNotas("Química", 8);

// Mostrar información detallada de cada estudiante
console.log("\n" + "--- Información del estudiante 1 ---");
console.log(estudiante1.infoDelEstudiante());

console.log("\n" + "--- Información del estudiante 2 ---");
console.log(estudiante2.infoDelEstudiante());

// Calcular promedios de notas por asignatura y total
console.log("\n" + "--- Cálculo de promedios ---");
console.log("Promedio en Matemáticas (Juan Pérez): " + estudiante1.calculaNotaMediaAsignaturas("Matemáticas"));
console.log("Promedio total (Juan Pérez): " + estudiante1.calculaNotaMediaTotal());
console.log("Promedio en Química (María López): " + estudiante2.calculaNotaMediaAsignaturas("Química"));
console.log("Promedio total (María López): " + estudiante2.calculaNotaMediaTotal());

// Generar un reporte completo del sistema académico
console.log("\n--- Reporte completo del sistema ---");
sistema.generarReporte();

// Función para ejecutar un menú interactivo
function menu() {
  // Se inicializa una nueva instancia del sistema
  const sistema = new SistemaGestionAcademica();

  let salir = false; // Bandera para controlar el ciclo del menú

  // Ciclo principal del menú
  while (!salir) {
    const opcion = parseInt(
      window.prompt(`
      --- Sistema de Gestión Académica ---
      1. Agregar estudiante
      2. Eliminar estudiante
      3. Listar estudiantes
      4. Matricular asignatura
      5. Desmatricular asignatura
      6. Agregar nota a una asignatura
      7. Calcular promedio de una asignatura
      8. Calcular promedio total de un estudiante
      9. Generar reporte completo
      10. Buscar estudiante por ID
      11. Buscar estudiantes matriculados en una asignatura
      12. Salir
      Seleccione una opción:`)
    );

    // Ejecuta una acción según la opción seleccionada
    switch (opcion) {
      case 1: // Agregar un nuevo estudiante
        const id = window.prompt("Ingrese ID del estudiante:");
        const nombre = window.prompt("Ingrese nombre:");
        const edad = parseInt(window.prompt("Ingrese edad:"));
        const calle = window.prompt("Ingrese calle:");
        const numero = window.prompt("Ingrese número:");
        const piso = window.prompt("Ingrese piso:");
        const codPostal = window.prompt("Ingrese código postal:");
        const provincia = window.prompt("Ingrese provincia:");
        const localidad = window.prompt("Ingrese localidad:");
        const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
        const estudiante = new Estudiante(id, nombre, edad, direccion);
        sistema.agregarEstudiante(estudiante);
        break;

      case 2: // Eliminar un estudiante
        const eliminarId = window.prompt("Ingrese el ID del estudiante a eliminar:");
        sistema.eliminarEstudiante(eliminarId);
        break;

      case 3: // Listar todos los estudiantes
        sistema.listarEstudiantes();
        break;

            case 4: // Matricular un estudiante en una asignatura
        const idMatricula = window.prompt("Ingrese el ID del estudiante:");
        const asignaturaMatricula = window.prompt("Ingrese el nombre de la asignatura:");
        const fechaMatricula = window.prompt("Ingrese la fecha de matriculación (YYYY-MM-DD):");
        const estudianteMatricula = sistema.estudiantes.find((estu) => estu.id === idMatricula);
        if (estudianteMatricula) {
          estudianteMatricula.matricular(asignaturaMatricula, fechaMatricula);
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 5: // Desmatricular un estudiante de una asignatura
        const idDesmatricula = window.prompt("Ingrese el ID del estudiante:");
        const asignaturaDesmatricula = window.prompt("Ingrese el nombre de la asignatura:");
        const estudianteDesmatricula = sistema.estudiantes.find((estu) => estu.id === idDesmatricula);
        if (estudianteDesmatricula) {
          estudianteDesmatricula.desmatricular(asignaturaDesmatricula);
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 6: // Agregar nota a una asignatura de un estudiante
        const idNota = window.prompt("Ingrese el ID del estudiante:");
        const asignaturaNota = window.prompt("Ingrese el nombre de la asignatura:");
        const nota = parseFloat(window.prompt("Ingrese la nota:"));
        const estudianteNota = sistema.estudiantes.find((estu) => estu.id === idNota);
        if (estudianteNota) {
          estudianteNota.agregarNotas(asignaturaNota, nota);
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 7: // Calcular el promedio de una asignatura para un estudiante
        const idPromedio = window.prompt("Ingrese el ID del estudiante:");
        const asignaturaPromedio = window.prompt("Ingrese el nombre de la asignatura:");
        const estudiantePromedio = sistema.estudiantes.find((estu) => estu.id === idPromedio);
        if (estudiantePromedio) {
          const promedio = estudiantePromedio.calculaNotaMediaAsignaturas(asignaturaPromedio);
          console.log("El promedio en"+asignaturaPromedio+" es:" +promedio);
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 8: // Calcular el promedio total de un estudiante
        const idPromedioTotal = window.prompt("Ingrese el ID del estudiante:");
        const estudiantePromedioTotal = sistema.estudiantes.find((estu) => estu.id === idPromedioTotal);
        if (estudiantePromedioTotal) {
          const promedioTotal = estudiantePromedioTotal.calculaNotaMediaTotal();
          console.log(`El promedio total del estudiante es: ${promedioTotal}`);
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 9: // Generar reporte completo del sistema
        sistema.generarReporte();
        break;

      case 10: // Buscar un estudiante por ID
        const idBuscar = window.prompt("Ingrese el ID del estudiante:");
        const estudianteBuscar = sistema.estudiantes.find((estu) => estu.id === idBuscar);
        if (estudianteBuscar) {
          console.log(estudianteBuscar.infoDelEstudiante());
        } else {
          console.log("Estudiante no encontrado.");
        }
        break;

      case 11: // Buscar estudiantes matriculados en una asignatura
        const asignaturaBuscar = window.prompt("Ingrese el nombre de la asignatura:");
        const estudiantesAsignatura = sistema.estudiantes.filter((estu) =>
          Object.keys(estu.asignaturas).includes(asignaturaBuscar)
        );
        if (estudiantesAsignatura.length > 0) {
          console.log(`Estudiantes matriculados en ${asignaturaBuscar}:`);
          estudiantesAsignatura.forEach((estu) => console.log(estu.infoDelEstudiante()));
        } else {
          console.log("No hay estudiantes matriculados en esta asignatura.");
        }
        break;

      case 12: // Salir del menú
        console.log("Saliendo del sistema. Hasta luego.");
        salir = true;
        break;

      default: // Opción no válida
        console.log("Opción no válida. Por favor, intente de nuevo.");
        break;
    }
  }
}

// Ejecutar el menú
menu();
