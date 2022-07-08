import React, { useEffect, useState } from "react";
import { gradosAcademicos } from "../api/gradosAcademicos";
import { nivelesAcademicos } from "../api/nivelesAcademicos";
import Input from "../components/Input/Input";
import Select from "../components/Select/Select";
import { GradoInterface } from "../ts/grado.interface";
import { NivelInterface } from "../ts/nivel.interface";

function CrearGrupo() {
  const [nivel, setNivel] = useState<string>("");
  const [grado, setGrado] = useState<string>("");
  const [gradoLista, setGradoLista] = useState<[] | Array<any>>([]);

  useEffect(() => {
    let nivelTemp: Array<NivelInterface> = nivelesAcademicos.filter(
      ({ nombre }) => nombre === nivel
    );
    let gradosTemp: Array<string> =
      nivelTemp.length !== 0 ? nivelTemp[0].grados : [];

    let grados: Array<GradoInterface> = [];
    gradosAcademicos.forEach((temp) => {
      if (gradosTemp.includes(temp._id)) grados.push(temp);
    });
    setGradoLista(grados);
  }, [nivel]);

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="mt-2 h-20 w-full flex items-center justify-between bg-white px-6 md:px-12">
        <div className="flex space-x-12">
          <button className="p-1 pr-3 flex items-center rounded-md bg-inputColor">
            <i className="bx bx-chevron-left text-primaryColor text-2xl"></i>
            <p className="font-medium">Atrás</p>
          </button>
          <span>
            <p className="font-normal text-textSelectColor text-sm">grados</p>
            <p className="font-medium text-lg">Crear grado</p>
          </span>
        </div>
        <button className="bg-inputColor py-2 px-3 rounded-md">
          <i className="bx bx-info-circle text-2xl text-primaryColor"></i>
        </button>
      </div>
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">Información del grado</h2>
        <div className="w-4/5 mt-6 mx-auto flex flex-col space-y-6">
          <div className="w-full flex flex-col">
            <label className="font-medium">Campus</label>
            <Input enable={false} defaultValue={"Tecnológico de Morelia"} />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium">Nombre del grado</label>
            <Input placeHolder="Nombre del grado" />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
            <div className="w-full flex flex-col">
              <label className="font-medium">Nivel</label>
              <Select
                text="Selecciona el Nivel"
                options={nivelesAcademicos}
                onChange={setNivel}
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium">Grado</label>
              <Select
                text="Selecciona el Grado"
                onChange={setGrado}
                options={gradoLista}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrearGrupo;
