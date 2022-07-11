interface AlumnoInterface {
  _id: string;
  esEliminado: boolean;
  usuario: {
    esActivo: boolean;
    esEliminado: boolean;
    esVerificadoEmail: boolean;
    esVerificadoTelefono: boolean;
    roles: Array<string>;
    _id: string;
    nombres: string;
    correoElectronico: string;
    telefono: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    genero: string;
    id: string;
  };
  nivelAcademico: {
    _id: string;
    nombre: string;
  };
  gradoAcademico: {
    _id:  string;
    nombre:  string;
  };
}

export type { AlumnoInterface };
