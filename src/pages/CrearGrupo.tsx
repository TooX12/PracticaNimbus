import { useEffect, useState } from "react";
import { gradosAcademicos } from "../api/gradosAcademicos";
import { nivelesAcademicos } from "../api/nivelesAcademicos";
import Input from "../components/Input/Input";
import Pagination from "../components/Pagination/Pagination";
import Select from "../components/Select/Select";
import { usePagination } from "../hooks/usePagination";
import { GradoInterface } from "../ts/grado.interface";
import { NivelInterface } from "../ts/nivel.interface";

function CrearGrupo() {
  const [nivel, setNivel] = useState<string>("");
  const [grado, setGrado] = useState<string>("");
  const [gradoLista, setGradoLista] = useState<[] | Array<any>>([]);
  let { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    [],
    10
  );

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
    <div className="w-full max-w-8xl mx-auto py-2">
      <div className="h-20 w-full flex items-center justify-between bg-white px-6 md:px-12">
        <div className="flex space-x-12">
          <button className="p-1 pr-3 flex items-center rounded-md bg-inputColor">
            <i className="bx bx-chevron-left text-primaryColor text-2xl"></i>
            <p className="font-medium">Atrás</p>
          </button>
          <span>
            <p className="font-normal text-textSelectColor text-sm">Grupos</p>
            <p className="font-medium text-lg">Crear grupo</p>
          </span>
        </div>
        <button className="bg-inputColor py-2 px-3 rounded-md">
          <i className="bx bx-info-circle text-2xl text-primaryColor"></i>
        </button>
      </div>
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">Información del grupo</h2>
        <div className="w-4/5 mt-6 mx-auto flex flex-col space-y-6">
          <div className="w-full flex flex-col">
            <label className="font-medium">Campus</label>
            <Input
              enable={false}
              defaultValue={"Tecnológico de Morelia"}
              className="mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="font-medium">Nombre del grado</label>
            <Input
              placeHolder="Nombre del grado"
              className="mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
            <div className="w-full flex flex-col">
              <label className="font-medium">Nivel</label>
              <Select
                text="Selecciona el Nivel"
                options={nivelesAcademicos}
                onChange={setNivel}
                className="mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium">Grado</label>
              <Select
                text="Selecciona el Grado"
                onChange={setGrado}
                options={gradoLista}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </section>
      <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">Programas y Recursos</h2>
        <div className="w-4/5 mt-6 mx-auto flex flex-col space-y-6">
          <div className="flex space-x-6">
            <span className="py-1 pl-2 pr-3 flex items-center rounded-md w-fit bg-white border-2 border-dividerColor">
              <p className="font-medium mr-2 text-textSelectColor">
                Materia Demo
              </p>
              <i className="bx bx-x-circle text-primaryColor text-2xl cursor-pointer"></i>
            </span>
            <button className="p-1 pr-3 flex items-center rounded-md w-fit bg-inputColor">
              <i className="bx bx-plus-circle text-primaryColor text-2xl mr-2"></i>
              <p className="font-medium">Agregar Materia</p>
            </button>
          </div>
        </div>
      </section>
      <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">
          Agregar profesor y Asignar materias
        </h2>
        <div className="w-4/5 mt-6 mx-auto flex flex-col space-y-3">
          <div className="flex flex-col">
            <div className="w-full rounded-md border-2 border-dividerColor bg-white py-2 px-4">
              <div className="flex justify-between">
                <span className="flex items-center">
                  <i className="bx bx-briefcase-alt-2 text-white font-medium text-2xl px-2 py-1 bg-[#3D718E] rounded-full mr-4"></i>
                  <p className="font-medium">Nombre completo</p>
                </span>
                <span className="flex items-center space-x-3">
                  <button className="bg-inputColor py-1 px-2 rounded-md">
                    <i className="bx bx-pencil text-2xl text-primaryColor"></i>
                  </button>
                  <button className="bg-[#DC3545] py-1 px-2 rounded-md">
                    <i className="bx bx-x-circle text-2xl text-white"></i>
                  </button>
                </span>
              </div>
              <hr className="w-full h-[2px] my-3 mx-auto bg-dividerColor" />
              <div className="w-1/2 mx-auto flex flex-col">
                <p className="font-medium mr-2 text-textSelectColor">
                  Materias Asignadas
                </p>
                <span className="w-full flex justify-between items-center rounded-md border-2 border-dividerColor mt-2 p-2 bg-white">
                  <p className="text-textSelectColor">Materias Asignadas</p>
                  <i className="bx bx-trash font-medium text-2xl text-primaryColor"></i>
                </span>
                <button className="w-full flex justify-center items-center rounded-md border-2 border-inputColor mt-2 mb-4 p-2 bg-inputColor">
                  <i className="bx bx-plus-circle font-medium text-2xl text-primaryColor mr-2"></i>
                  <p className="font-medium">Asignar Materia</p>
                </button>
              </div>
            </div>
          </div>
          <button
            className="
          w-11/12 rounded-md border-2 mx-auto 
          border-dividerColor 
          bg-white py-2 px-4 flex 
          items-center justify-center 
          hover:bg-dividerColor hover:text-primaryColor
          transition-all duration-500
          "
          >
            <i className="bx bx-plus-circle font-medium text-2xl text-primaryColor mr-2"></i>
            <p className="font-medium">Asignar Materia</p>
          </button>
        </div>
      </section>
      <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium my-2">Alumnos</h2>
          <span className="flex items-center bg-inputColor px-2 rounded-md w-1/2 md:w-fit">
            <i className="bx bx-search font-medium text-2xl text-primaryColor"></i>
            <Input
              className="bg-inputColor border-inputColor rounded-none"
              placeHolder="Buscar..."
            />
          </span>
        </div>
        <div className="mt-6 mx-auto flex flex-col space-y-3">
          <div className="flex justify-between flex-wrap space-y-3">
            <div className="flex space-x-3">
              <button
                className="rounded-md border-2 
          border-dividerColor 
          bg-dividerColor py-2 px-4 
          hover:bg-dividerColor hover:text-primaryColor
          transition-all duration-500
          "
              >
                <p className="font-medium">Inscritos al grupo</p>
              </button>
              <button
                className="rounded-md border-2 
          border-white
          text-textSelectColor 
          bg-white py-2 px-4 
          hover:bg-dividerColor hover:text-primaryColor
          transition-all duration-500
          "
              >
                <p className="font-medium">Alumnos Campus</p>
              </button>
            </div>
            <div className="flex w-full md:w-1/2 lg:w-1/4 space-x-3">
              <Select text="Nivel" onChange={setGrado} options={gradoLista} />
              <Select text="Grado" onChange={setGrado} options={gradoLista} />
            </div>
          </div>
          <div className="h-72 !my-12 w-full flex justify-center items-center">
            <div className="w-1/2 flex flex-col items-center space-y-6">
              <i className="bx bx-error-circle font-medium text-6xl text-primaryColor"></i>
              <p className="text-textSelectColor font-medium text-center">
                Aún no tienes alumnos agragados, selección el botón “Alumnos
                Campus” del menú de arriba para ver el listado de los alumnos y
                agregalos con el botón verde, una vez que los agregues,
                selecciona eñ botón “Inscritos al Grupo” para verlos agregados.
              </p>
            </div>
          </div>
          <Pagination
            next={next}
            prev={prev}
            currentPage={currentPage}
            data={currentData()}
            jump={jump}
            maxPage={maxPage}
          />
        </div>
      </section>
      <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
      <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
        <h2 className="text-xl font-medium my-2">Resúmen</h2>
        <div className="w-full mt-6 flex space-x-12">
          <span className="flex items-center space-x-6">
            <p className="font-medium">Materias</p>
            <p className="h-10 w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
              1
            </p>
          </span>
          <span className="flex items-center space-x-6">
            <p className="font-medium">Profesores</p>
            <p className="h-10 w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
              1
            </p>
          </span>
          <span className="flex items-center space-x-6">
            <p className="font-medium">Alumnos agregados al grupo</p>
            <p className="h-10 w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
              12
            </p>
          </span>
        </div>
        <div className="w-full mt-24 mb-12 flex justify-center space-x-8">
          <button
            className="rounded-md border-2 
          border-[#F5F5F5] 
          bg-[#F5F5F5]
          text-primaryColor 
          py-2 px-12 
          hover:bg-[#F5F5F5] hover:text-primaryColor
          transition-all duration-500
          "
          >
            <p className="font-medium">Cancelar</p>
          </button>
          <button
            className="rounded-md border-2 
          border-primaryColor 
          bg-primaryColor
          text-white 
          py-2 px-12 
          hover:bg-primaryColor hover:text-white
          transition-all duration-500
          "
          >
            <p className="font-medium">Guardar</p>
          </button>
        </div>
      </section>
    </div>
  );
}

export default CrearGrupo;
