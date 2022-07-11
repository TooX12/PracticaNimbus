interface ProfesorInterface {
    _id: string,
    usuario: {
      esActivo: boolean,
      esEliminado: boolean,
      esVerificadoEmail: boolean,
      esVerificadoTelefono: boolean,
      roles: Array<string>,
      nombres: string,
      correoElectronico: string,
      telefono: string,
      pais: string,
      estado: string,
      municipio: string,
      cp: string,
      colonia: string,
      calle: string,
      fechaNacimiento: string,
    }
  }
  
  export type { ProfesorInterface };
  