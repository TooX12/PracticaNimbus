import React from "react";
import Input from "../components/Input/Input";
import Select from "../components/Select/Select";


function CrearGrupo() {

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="mt-2 h-20 w-full flex items-center justify-between bg-white px-6 md:px-12">
        <div className="flex space-x-12">
          <button className="p-1 pr-3 flex items-center rounded-md bg-inputColor">
            <i className="bx bx-chevron-left text-primaryColor text-2xl"></i>
            <p className="font-medium">Atrás</p>
          </button>
          <span>
            <p className="font-normal text-textSelectColor text-sm">Grupos</p>
            <p className="font-medium text-lg">Crear Grupo</p>
          </span>
        </div>
        <button className="bg-inputColor py-2 px-3 rounded-md">
          <i className="bx bx-info-circle text-2xl text-primaryColor"></i>
        </button>
      </div>
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">Información del Grupo</h2>
        <div className="w-4/5 mt-6 mx-auto flex flex-col space-y-6">
          <div className="w-full flex flex-col">
            <label className="font-medium">Campus</label>
            <Input enable={false} defaultValue={"Tecnológico de Morelia"}/>
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium">Nombre del Grupo</label>
            <Input placeHolder="Nombre del grupo"/>
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
            <div className="w-full flex flex-col">
              <label className="font-medium">Nivel</label>
              <Select text="Selecciona el Nivel"/>
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium">Grado</label>
              <Select text="Selecciona el Grado"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrearGrupo;
