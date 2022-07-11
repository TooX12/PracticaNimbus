import { useEffect, useState } from "react";
import { alumnos } from "../api/alumnos";
import { gradosAcademicos } from "../api/gradosAcademicos";
import { materias } from "../api/materias";
import { nivelesAcademicos } from "../api/nivelesAcademicos";
import { profesores } from "../api/profesores";
import Input from "../components/Input/Input";
import Pagination from "../components/Pagination/Pagination";
import Select from "../components/Select/Select";
import { usePagination } from "../hooks/usePagination";
import useToggle from "../hooks/useToggle";
import { ToastContainer } from "react-toastify";
import { alert } from "../utils/alert.utils";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import FilterInput from "../components/FilterInput/FilterInput";
import { AlumnoInterface, AsignaturaInterface, GradoInterface, MateriaInterface, NivelInterface, ProfesorInterface } from "../ts";

const GrupoSchema = Yup.object().shape({
  campus: Yup.string().required("Este campo es requerido"),
  nombre: Yup.string()
    .required("Este campo es requerido")
    .min(15, "El nombre es demasiado corto")
    .max(70, "El nombre es demasiado largo"),
});

function CrearGrupo() {
  const formik = useFormik({
    initialValues: {
      campus: "Tecnológico de Morelia",
      nombre: "",
    },
    validationSchema: GrupoSchema,
    onSubmit: (values) => {
      window.alert(
        JSON.stringify({
          campus: values.campus,
          gradosAcademicos: grado,
          materias: materiasLista.map((materia) => materia._id),
          alumnos: alumnosInscritosLista.map((alumno) => alumno._id),
          _id: "fbu2-jabnod-r391bg",
          nombre: values.nombre,
          nivelesAcademicos: nivel,
        })
      );
      alert("success", "El grupo ha sido agregado");
    },
  });

  const [nivel, setNivel] = useState<string>("");
  const [grado, setGrado] = useState<string>("");
  const [nivelFiltrar, setNivelFiltrar] = useState<string>("");
  const [gradoFiltrar, setGradoFiltrar] = useState<string>("");
  const [busquedaFiltrar, setBusquedaFiltrar] = useState<string>("");
  const [materia, setMateria] = useState<string>("");
  const [profesor, setProfesor] = useState<string>("");
  const [materiaAsignada, setMateriaAsignada] = useState<string>("");
  const [showAgregarMateria, setShowAgregarMateria] = useToggle();
  const [showAgregarProfesor, setShowAgregarProfesor] = useToggle();
  const [showAlumnosInscritos, setShowAlumnosInscritos] = useState(true);
  const [showAlumnosCampus, setShowAlumnosCampus] = useState(false);
  const [gradoLista, setGradoLista] = useState<[] | Array<GradoInterface>>([]);
  const [gradoFiltrarLista, setGradoFiltrarLista] = useState<
    [] | Array<GradoInterface>
  >([]);
  const [materiasLista, setMateriasLista] = useState<Array<MateriaInterface>>(
    []
  );
  const [profesoresLista, setProfesoresLista] = useState<
    [] | Array<ProfesorInterface>
  >([]);
  const [alumnosInscritosLista, setAlumnosInscritosLista] = useState<
    [] | Array<AlumnoInterface>
  >([]);

  const [alumnosLista, setAlumnosLista] = useState<[] | Array<AlumnoInterface>>(
    []
  );

  const [asignaturasLista, setAsignaturasLista] = useState<
    [] | Array<AsignaturaInterface>
  >([]);
  let { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    alumnosLista,
    10
  );

  const addProfesor = async (profesorID: string) => {
    if (!checarProfesor(profesorID) && profesorID !== "") {
      let id = await fetch(
        "https://www.uuidtools.com/api/generate/v1/count/1"
      ).then((resp) => resp.json());
      let profesorTemp = profesores.filter(({ _id }) => _id === profesor)[0];
      let asignaturaTemp = [
        ...asignaturasLista,
        {
          materias: [],
          _id: id[0],
          profesor: {
            _id: profesorTemp._id,
            ...profesorTemp.usuario,
          },
          showMateria: false,
        },
      ];
      setAsignaturasLista(asignaturaTemp);
      setProfesoresLista([...profesoresLista, profesorTemp]);
      setProfesor("");
      setShowAgregarProfesor();
      alert("success", "El profesor ha sido agregado");
    } else if (profesorID === "") {
      alert("warning", "Selecciona un profesor");
    } else {
      alert("warning", "El profesor ya ha sido agregado");
    }
  };

  const removeProfesor = (asignaturaID: string, profesorID: string) => {
    let profesoresTemp = profesoresLista.filter(
      ({ _id }) => _id !== profesorID
    );
    let asignaturasTemp = asignaturasLista.filter(
      ({ _id }) => _id !== asignaturaID
    );
    setProfesoresLista(profesoresTemp);
    setAsignaturasLista(asignaturasTemp);
    alert("success", "El profesor ha sido eliminado");
  };

  const addMateria = (materiaID: string) => {
    if (!checarMateria(materiaID) && materiaID !== "") {
      let materiaTemp = materias.filter(({ _id }) => _id === materiaID);
      setMateriasLista([...materiasLista, ...materiaTemp]);
      setShowAgregarMateria();
      setMateria("");
      alert("success", "La materia ha sido agregada");
    } else if (materiaID === "") {
      alert("warning", "Selecciona una materia");
    } else {
      alert("warning", "La materia ya ha sido agregada");
    }
  };

  const removeMateria = (materiaID: string) => {
    let materiasTemp = materiasLista.filter(({ _id }) => _id !== materiaID);
    asignaturasLista.forEach((asignatura) => {
      removeMateriaAsignada(asignatura._id, materiaID);
    });
    setMateriasLista(materiasTemp);
    alert("success", "La materia se ha removido");
  };

  const checarMateria = (materiaID: string) => {
    let check: boolean = false;
    materiasLista.forEach((materia) => {
      if (materia._id === materiaID) check = true;
    });

    return check;
  };

  const checarProfesor = (profesorID: string) => {
    let check: boolean = false;
    profesoresLista.forEach((profesor) => {
      if (profesor._id === profesorID) check = true;
    });

    return check;
  };

  const checarMateriaAsignada = (asignaturaID: string, materiaID: string) => {
    let check: boolean = false;
    asignaturasLista.forEach((asignatura) => {
      if (
        asignatura._id === asignaturaID &&
        asignatura.materias.includes(materiaID)
      )
        check = true;
    });

    return check;
  };

  const checarAlumno = (alumnoID: string) => {
    let check: boolean = false;
    alumnosInscritosLista.forEach((alumno) => {
      if (alumno._id === alumnoID) check = true;
    });

    return check;
  };

  const asignarMateria = (asignaturaID: string, materiaID: string) => {
    if (!checarMateriaAsignada(asignaturaID, materiaID) && materiaID !== "") {
      let asignaturasTemp = Array.from([...asignaturasLista]);
      asignaturasTemp.forEach((asignatura) => {
        if (asignatura._id === asignaturaID) {
          asignatura.materias = [...asignatura.materias, materiaID];
          asignatura.showMateria = !asignatura.showMateria;
        }
      });
      setAsignaturasLista(asignaturasTemp);
      setMateriaAsignada("");
      alert("success", "La materia ha sido asignada");
    } else if (materiaID === "") {
      alert("warning", "Selecciona una materia");
    } else {
      alert("warning", "La materia ya ha sido asignada");
    }
  };

  const removeMateriaAsignada = (asignaturaID: string, materiaID: string) => {
    let asignaturasTemp = Array.from([...asignaturasLista]);
    asignaturasTemp.forEach((asignatura) => {
      if (asignatura._id === asignaturaID) {
        let materiasTemp = asignatura.materias.filter(
          (materia: string) => materia !== materiaID
        );
        asignatura.materias = materiasTemp;
      }
    });
    setAsignaturasLista(asignaturasTemp);
  };

  const showAsignarMateria = (asignaturaID: string) => {
    let asignaturasTemp = Array.from([...asignaturasLista]);
    asignaturasTemp.forEach((asignatura) => {
      if (asignatura._id === asignaturaID) {
        asignatura.showMateria = !asignatura.showMateria;
      }
    });
    setAsignaturasLista(asignaturasTemp);
  };

  const getMateriasAsignadas = (materiaID: string) => {
    let materiaTemp = materias.filter(({ _id }) => _id === materiaID);
    return materiaTemp[0];
  };

  const addAlumnoGrupo = (alumno: AlumnoInterface) => {
    if (!checarAlumno(alumno._id)) {
      setAlumnosInscritosLista([...alumnosInscritosLista, alumno]);
      alert("success", "El alumno ha sido inscrito al grupo");
    } else {
      alert("warning", "El alumno ya ha sido inscrito al grupo");
    }
  };

  const removeAlumnoGrupo = (alumnoID: string) => {
    let alumnosTemp = alumnosInscritosLista.filter(
      (alumno) => alumno._id !== alumnoID
    );
    setAlumnosInscritosLista(alumnosTemp);
    setAlumnosLista(alumnosTemp);
    alert("success", "El alumno ha sido removido del grupo");
  };

  const getAlumnosInscritos = () => {
    setShowAlumnosInscritos(true);
    setShowAlumnosCampus(false);
    setAlumnosLista(alumnosInscritosLista);
  };

  const getAlumnosCampus = () => {
    setShowAlumnosInscritos(false);
    setShowAlumnosCampus(true);
    setAlumnosLista(alumnos);
  };

  const filtrarResultados = () => {
    let temp = showAlumnosCampus
      ? Array.from([...alumnos])
      : Array.from([...alumnosInscritosLista]);
    let tempArray = temp;
    if (nivelFiltrar === "") {
      setAlumnosLista(temp);
    } else if (nivelFiltrar !== "" && gradoFiltrar === "") {
      tempArray = temp.filter(
        (alumno) => alumno.nivelAcademico._id === nivelFiltrar
      );
      setAlumnosLista(tempArray);
    } else if (nivelFiltrar !== "" && gradoFiltrar !== "") {
      tempArray = temp.filter(
        (alumno) =>
          alumno.nivelAcademico._id === nivelFiltrar &&
          alumno.gradoAcademico._id === gradoFiltrar
      );

      setAlumnosLista(tempArray);
    }
    if (busquedaFiltrar !== "") {
      let busqueda = busquedaFiltrar.toLowerCase();
      let tempArray2 = tempArray.filter(
        (alumno) =>
          alumno.usuario.nombres.toLowerCase().includes(busqueda) ||
          alumno.usuario.correoElectronico.toLowerCase().includes(busqueda) ||
          alumno.nivelAcademico.nombre.toLowerCase().includes(busqueda) ||
          alumno.gradoAcademico.nombre.toLowerCase().includes(busqueda)
      );
      setAlumnosLista(tempArray2);
    }
  };

  useEffect(() => {
    let nivelTemp: Array<NivelInterface> = nivelesAcademicos.filter(
      ({ _id }) => _id === nivel
    );
    let gradosTemp: Array<string> =
      nivelTemp.length !== 0 ? nivelTemp[0].grados : [];
    let grados: Array<GradoInterface> = [];
    gradosAcademicos.forEach((temp) => {
      if (gradosTemp.includes(temp._id)) grados.push(temp);
    });
    setGradoLista(grados);
  }, [nivel]);

  useEffect(() => {
    let nivelTemp: Array<NivelInterface> = nivelesAcademicos.filter(
      ({ _id }) => _id === nivelFiltrar
    );
    let gradosTemp: Array<string> =
      nivelTemp.length !== 0 ? nivelTemp[0].grados : [];
    let grados: Array<GradoInterface> = [];
    gradosAcademicos.forEach((temp) => {
      if (gradosTemp.includes(temp._id)) grados.push(temp);
    });
    setGradoFiltrarLista(grados);
    filtrarResultados();
  }, [nivelFiltrar, gradoFiltrar, busquedaFiltrar]);

  return (
    <div className="w-full max-w-8xl mx-auto py-2">
      <form onSubmit={formik.handleSubmit}>
        <div className="h-20 w-full flex items-center justify-between bg-white px-6 md:px-12">
          <div className="flex space-x-12">
            <button
              type="button"
              className="p-1 pr-3 flex items-center rounded-md bg-inputColor"
            >
              <i className="bx bx-chevron-left text-primaryColor text-2xl"></i>
              <p className="font-medium">Atrás</p>
            </button>
            <span>
              <p className="font-normal text-textSelectColor text-sm">Grupos</p>
              <p className="font-medium text-lg">Crear grupo</p>
            </span>
          </div>
          <button type="button" className="bg-inputColor py-2 px-3 rounded-md">
            <i className="bx bx-info-circle text-2xl text-primaryColor"></i>
          </button>
        </div>
        <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
          <h2 className="text-lg md:text-xl font-medium my-2">
            Información del grupo
          </h2>
          <div className="w-full md:w-4/5 mt-6 mx-auto flex flex-col space-y-6">
            <div className="w-full flex flex-col">
              <label className="font-medium">Campus</label>
              <Input
                enable={false}
                className="mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-500 !text-sm md:!text-base"
                onChange={formik.handleChange}
                value={formik.values.campus}
                id="campus"
              />
              {formik.touched.campus && formik.errors.campus ? (
                <div className="text-sm text-red-400 mt-1">
                  {formik.errors.campus}
                </div>
              ) : null}
            </div>
            <div className="w-full flex flex-col">
              <label className="font-medium">Nombre del grupo</label>
              <Input
                placeHolder="Nombre del grupo"
                className="mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-500 !text-sm md:!text-base"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                id="nombre"
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="text-sm text-red-400 mt-1">
                  {formik.errors.nombre}
                </div>
              ) : null}
            </div>
            <div className="w-full flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
              <div className="w-full flex flex-col">
                <label className="font-medium">Nivel</label>
                <Select
                  placeHolder="Selecciona el Nivel"
                  options={nivelesAcademicos}
                  onChange={setNivel}
                  className="mt-2 !text-sm md:!text-base"
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="font-medium">Grado</label>
                <Select
                  placeHolder="Selecciona el Grado"
                  onChange={setGrado}
                  options={gradoLista}
                  className="mt-2 !text-sm md:!text-base"
                />
              </div>
            </div>
          </div>
        </section>
        <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
        <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
          <span className="flex items-center">
            <h2 className="text-lg md:text-xl font-medium my-2 mr-3">
              Programas y Recursos
            </h2>
            <p className="h-7 w-7 bg-[#697D99] flex items-center justify-center rounded-full text-white font-medium">
              {materiasLista.length}
            </p>
          </span>
          <div className="w-full md:w-4/5 mt-6 mx-auto flex flex-col space-y-6">
            <div className="flex items-center flex-wrap">
              {materiasLista.length !== 0 &&
                materiasLista.map((materia) => (
                  <span
                    key={materia._id}
                    className="py-1 pl-2 pr-3 flex items-center rounded-md w-fit mr-3 mt-3 bg-white border-2 border-dividerColor"
                  >
                    <p className="text-sm font-medium mr-2 text-textSelectColor">
                      {materia.nombre}
                    </p>
                    <i
                      className="bx bx-x-circle text-primaryColor text-2xl cursor-pointer"
                      onClick={() => removeMateria(materia._id)}
                    ></i>
                  </span>
                ))}
              {!showAgregarMateria && (
                <button
                  type="button"
                  className="p-1 pr-3 flex items-center rounded-md w-fit border-inputColor border-2 bg-inputColor mt-3  hover:bg-dividerColor transition-all duration-500"
                  onClick={setShowAgregarMateria}
                >
                  <i className="bx bx-plus-circle text-primaryColor text-2xl mr-2"></i>
                  <p className="font-medium">Agregar Materia</p>
                </button>
              )}
              {showAgregarMateria && (
                <span className="flex space-x-3 mt-3">
                  <Select
                    placeHolder="Selecciona la Materia"
                    options={materias}
                    onChange={setMateria}
                    className="w-48 sm:w-64 !text-sm md:!text-base !py-1"
                  />
                  <button
                    type="button"
                    className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 py-0 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                    onClick={() => addMateria(materia)}
                  >
                    <i className="bx bx-plus-circle font-medium text-lg md:text-2xl text-primaryColor"></i>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 py-0 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                    onClick={setShowAgregarMateria}
                  >
                    <i className="bx bx-x-circle font-medium text-lg md:text-2xl text-[#DC3545]"></i>
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>
        <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
        <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
          <span className="flex items-center">
            <h2 className="text-lg md:text-xl font-medium my-2 mr-3">
              Agregar profesor y Asignar materias
            </h2>
            <p className="h-7 w-7 bg-[#697D99] flex items-center justify-center rounded-full text-white font-medium">
              {profesoresLista.length}
            </p>
          </span>
          <div className="w-full md:w-4/5 mt-6 mx-auto flex flex-col space-y-3">
            {asignaturasLista.length !== 0 &&
              asignaturasLista.map((asignatura) => (
                <div className="flex flex-col" key={asignatura._id}>
                  <div className="w-full rounded-md border-2 border-dividerColor bg-white py-2 px-4">
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <i className="bx bx-briefcase-alt-2 text-white font-medium text-lg md:text-2xl px-1 md:py-1 md:px-2 bg-[#3D718E] rounded-full mr-4"></i>
                        <p className="text-sm md:text-base font-medium">
                          {asignatura.profesor.nombres}
                        </p>
                      </span>
                      <span className="flex items-center space-x-3">
                        <button
                          type="button"
                          className="bg-inputColor px-1 md:py-1 md:px-2 rounded-md  border-inputColor border-2 hover:bg-dividerColor transition-all duration-500"
                        >
                          <i className="bx bx-pencil text-lg md:text-2xl text-primaryColor"></i>
                        </button>
                        <button
                          type="button"
                          className="bg-[#DC3545] px-1 md:py-1 md:px-2 rounded-md  border-[#DC3545] border-2 hover:bg-[#c52938] transition-all duration-500"
                          onClick={() =>
                            removeProfesor(
                              asignatura._id,
                              asignatura.profesor._id
                            )
                          }
                        >
                          <i className="bx bx-x-circle text-lg md:text-2xl text-white"></i>
                        </button>
                      </span>
                    </div>
                    <hr className="w-full h-[2px] my-3 mx-auto bg-dividerColor" />
                    <div className="w-full md:w-1/2 mx-auto flex flex-col">
                      <p className="text-sm md:text-base font-medium mr-2 text-textSelectColor">
                        Materias Asignadas
                      </p>
                      {asignatura.materias.length !== 0 &&
                        asignatura.materias.map((materiaID: string) => {
                          let materiaTemp: MateriaInterface =
                            getMateriasAsignadas(materiaID);
                          return (
                            <span
                              className="w-full flex justify-between items-center rounded-md border-2 border-dividerColor mt-2 px-1 md:p-2 bg-white"
                              key={materiaID}
                            >
                              <p className="text-sm md:text-base text-textSelectColor">
                                {materiaTemp.nombre}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  removeMateriaAsignada(
                                    asignatura._id,
                                    materiaID
                                  )
                                }
                              >
                                <i className="bx bx-trash font-medium text-lg md:text-2xl text-primaryColor"></i>
                              </button>
                            </span>
                          );
                        })}
                      {asignatura.showMateria && (
                        <span className="flex space-x-3 mt-3">
                          <Select
                            placeHolder="Selecciona la Materia"
                            options={materiasLista}
                            onChange={setMateriaAsignada}
                            className="w-48 md:w-64 !text-sm md:!text-base !py-1"
                          />
                          <button
                            type="button"
                            className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                            onClick={() =>
                              asignarMateria(asignatura._id, materiaAsignada)
                            }
                          >
                            <i className="bx bx-plus-circle font-medium text-lg md:text-2xl text-primaryColor"></i>
                          </button>
                          <button
                            type="button"
                            className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                            onClick={() => showAsignarMateria(asignatura._id)}
                          >
                            <i className="bx bx-x-circle font-medium text-lg md:text-2xl text-[#DC3545]"></i>
                          </button>
                        </span>
                      )}
                      {!asignatura.showMateria && (
                        <button
                          type="button"
                          className="w-full flex justify-center items-center rounded-md border-2 border-inputColor mt-2  md:mb-4 md:p-2 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                          onClick={() => showAsignarMateria(asignatura._id)}
                        >
                          <i className="bx bx-plus-circle font-medium text-lg md:text-2xl text-primaryColor mr-2"></i>
                          <p className="text-sm md:text-base font-medium">
                            Asignar Materia
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {!showAgregarProfesor && (
              <button
                type="button"
                className="
          w-11/12 rounded-md border-2 mx-auto 
          border-dividerColor 
          bg-white py-0.5 md:py-2 md:px-4 flex 
          items-center justify-center 
          hover:bg-dividerColor hover:text-primaryColor
          transition-all duration-500
          "
                onClick={setShowAgregarProfesor}
              >
                <i className="bx bx-plus-circle font-medium text-lg md:text-2xl text-primaryColor mr-2"></i>
                <p className="text-sm md:text-base font-medium">
                  Agregar Profesor
                </p>
              </button>
            )}
            {showAgregarProfesor && (
              <span className="flex space-x-3 mt-3 justify-center">
                <Select
                  placeHolder="Selecciona el profesor"
                  options={profesores}
                  onChange={setProfesor}
                  className="w-48 md:w-64 !text-sm md:!text-base !py-1"
                />
                <button
                  type="button"
                  className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                  onClick={() => addProfesor(profesor)}
                >
                  <i className="bx bx-plus-circle font-medium text-lg md:text-2xl text-primaryColor"></i>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center rounded-md border-2 border-inputColor px-1 bg-inputColor hover:bg-dividerColor transition-all duration-500"
                  onClick={setShowAgregarProfesor}
                >
                  <i className="bx bx-x-circle font-medium text-lg md:text-2xl text-[#DC3545]"></i>
                </button>
              </span>
            )}
          </div>
        </section>
        <hr className="w-11/12 h-[2px] mt-10 mb-4 mx-auto bg-dividerColor" />
        <section className="px-6 md:px-12 w-full lg:w-9/12 mt-8 mx-auto">
          <div className="flex justify-between">
            <span className="flex items-center">
              <h2 className="text-lg md:text-xl font-medium my-2 mr-3">
                Alumnos
              </h2>
              <p className="h-7 w-7 bg-[#697D99] flex items-center justify-center rounded-full text-white font-medium">
                {alumnosInscritosLista.length}
              </p>
            </span>
            <span className="flex items-center bg-inputColor px-2 rounded-md w-32 md:w-fit">
              <i className="bx bx-search font-medium text-lg md:text-2xl text-primaryColor"></i>
              <FilterInput
                className="bg-inputColor border-inputColor rounded-none !text-sm md:!text-base"
                placeHolder="Buscar..."
                onChange={(e: any) => setBusquedaFiltrar(e.target.value)}
              />
            </span>
          </div>
          <div className="mt-6 mx-auto flex flex-col">
            <div className="flex justify-between flex-wrap space-y-3 mb-4">
              <div className="flex space-x-3">
                <button
                  type="button"
                  className={`${
                    showAlumnosInscritos
                      ? "border-dividerColor bg-dividerColor text-textColor"
                      : " border-white text-textSelectColor bg-white hover:bg-dividerColor hover:border-dividerColor"
                  } 
                rounded-md border-2 py-1 px-2 md:py-2 md:px-4 
                hover:text-primaryColor
                transition-all duration-500
                text-sm md:text-base
                font-medium
          `}
                  onClick={getAlumnosInscritos}
                >
                  Inscritos al grupo
                </button>
                <button
                  type="button"
                  className={`${
                    showAlumnosCampus
                      ? "border-dividerColor bg-dividerColor text-textColor"
                      : " border-white text-textSelectColor bg-white hover:bg-dividerColor hover:border-dividerColor"
                  } 
                rounded-md border-2 py-1 px-2 md:py-2 md:px-4 
                hover:text-primaryColor
                transition-all duration-500
                text-sm md:text-base
                font-medium
          `}
                  onClick={getAlumnosCampus}
                >
                  Alumnos Campus
                </button>
              </div>
              <div className="flex w-full md:w-1/2 lg:w-1/4 space-x-3">
                <Select
                  placeHolder="Nivel"
                  onChange={setNivelFiltrar}
                  options={nivelesAcademicos}
                  className="!text-sm md:!text-base"
                />
                <Select
                  placeHolder="Grado"
                  onChange={setGradoFiltrar}
                  options={gradoFiltrarLista}
                  className="!text-sm md:!text-base"
                />
              </div>
            </div>
            <div className="flex flex-col">
              {currentData().map((alumno) => (
                <div
                  key={alumno._id}
                  className="border-2 mb-1 rounded-md border-dividerColor bg-white p-2 flex justify-between space-x-3"
                >
                  <div className="flex items-center space-x-2 md:space-x-3 basis-[24rem]">
                    <input
                      type="checkbox"
                      id="inline"
                      className="h-5 w-5 cursor-pointer"
                    />
                    <i className="bx bx-happy text-lg md:text-2xl px-1 md:px-2 md:py-1 rounded-full bg-primaryColor text-white"></i>
                    <p className="font-medium text-sm md:text-base">
                      {alumno.usuario.nombres}
                    </p>
                  </div>
                  <div className="flex items-center justify-end space-x-3 basis-[calc(100%-24rem)]">
                    <p className="hidden 2xl:block break-words basis-64 ">
                      {alumno.usuario.correoElectronico}
                    </p>
                    <p className="hidden sm:block text-sm md:text-base basis-24 ">
                      {alumno.nivelAcademico.nombre}
                    </p>
                    <p className="hidden md:block basis-24 ">
                      {alumno.gradoAcademico.nombre}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <button
                      type="button"
                      className="px-1 md:px-1.5 md:py-0.5 flex items-center rounded-md w-fit bg-inputColor"
                    >
                      <i className="bx bx-show text-primaryColor text-lg md:text-2xl"></i>
                    </button>
                    {showAlumnosCampus ? (
                      <button
                        type="button"
                        className="px-1 md:px-1.5 md:py-0.5 flex items-center rounded-md w-fit bg-[#28A745]"
                        onClick={() => addAlumnoGrupo(alumno)}
                      >
                        <i className="bx bx-plus-circle text-white text-lg md:text-2xl"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-1 md:px-1.5 md:py-0.5 flex items-center rounded-md w-fit bg-[#DC3545]"
                        onClick={() => removeAlumnoGrupo(alumno._id)}
                      >
                        <i className="bx bx-x-circle text-white text-lg md:text-2xl"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {alumnosInscritosLista.length === 0 && !showAlumnosCampus && (
              <div className="my-8 w-full flex justify-center items-center">
                <div className="w-3/4 md:w-1/2 flex flex-col items-center space-y-6">
                  <i className="bx bx-error-circle font-medium text-5xl md:text-6xl text-primaryColor"></i>
                  <p className="text-textSelectColor font-medium text-center text-sm md:text-base">
                    Aún no tienes alumnos agregados, selección el botón “Alumnos
                    Campus” del menú de arriba para ver el listado de los
                    alumnos y agregalos con el botón verde, una vez que los
                    agregues, selecciona el botón “Inscritos al Grupo” para
                    verlos agregados.
                  </p>
                </div>
              </div>
            )}
            {alumnosLista.length === 0 &&
              (showAlumnosCampus ||
                (!showAlumnosCampus && alumnosInscritosLista.length !== 0)) && (
                <div className="my-8 w-full flex justify-center items-center">
                  <div className="w-3/4 md:w-1/2 flex flex-col items-center space-y-6">
                    <i className="bx bx-sad font-medium text-5xl md:text-6xl text-primaryColor"></i>
                    <p className="text-textSelectColor font-medium text-center text-sm md:text-base">
                      No se han encontrado resultados ...
                    </p>
                  </div>
                </div>
              )}
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
          <h2 className="text-lg md:text-xl font-medium my-2">Resúmen</h2>
          <div className="w-full mt-6 flex flex-col md:flex-row space-y-3 md:space-x-12 md:space-y-0">
            <span className="flex items-center justify-between md:justify-start space-x-3 md:space-x-6">
              <p className="text-sm md:text-base font-medium">Materias</p>
              <p className="h-7 w-7 md:h-10 md:w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
                {materiasLista.length}
              </p>
            </span>
            <span className="flex items-center justify-between md:justify-start space-x-6">
              <p className="text-sm md:text-base font-medium">Profesores</p>
              <p className="h-7 w-7 md:h-10 md:w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
                {profesoresLista.length}
              </p>
            </span>
            <span className="flex items-center justify-between md:justify-start space-x-6">
              <p className="text-sm md:text-base font-medium">
                Alumnos agregados al grupo
              </p>
              <p className="h-7 w-7 md:h-10 md:w-10 bg-gradient-to-br from-[#38BFD8] to-[#2EDE9A] flex items-center justify-center rounded-full text-white font-medium">
                {alumnosInscritosLista.length}
              </p>
            </span>
          </div>
          <div className="w-full mt-12 mb-6 md:mt-24 md:mb-12 flex justify-center space-x-8">
            <button
              type="button"
              className="rounded-md border-2 
          border-[#F5F5F5] 
          bg-[#F5F5F5]
          text-primaryColor 
          px-10 py-2 md:px-12 
          hover:bg-dividerColor hover:text-primaryColor
          transition-all duration-500
          text-sm md:text-base font-medium
          "
            >
              Cancelar
            </button>
            <button
              className="rounded-md border-2 
          border-primaryColor 
          bg-primaryColor
          text-white 
          px-10 py-2 md:px-12 
          hover:bg-primaryColor hover:text-white
          transition-all duration-500
          text-sm md:text-base font-medium
          "
              type="submit"
            >
              Guardar
            </button>
          </div>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CrearGrupo;
