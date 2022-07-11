interface AsignaturaInterface {
  _id: string;
  materias: Array<string>;
  showMateria?: boolean;
  profesor: {
    esActivo: boolean;
    esEliminado: boolean;
    esVerificadoEmail: boolean;
    esVerificadoTelefono: boolean;
    roles: Array<string>;
    nombres: string;
    _id: string;
    correoElectronico: string;
    telefono: string;
    pais: string;
    estado: string;
    municipio: string;
    cp: string;
    colonia: string;
    calle: string;
    fechaNacimiento: string;
  };
}

export type { AsignaturaInterface };
