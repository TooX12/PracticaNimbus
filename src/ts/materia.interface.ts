import { LibroInterface } from "./libro.interface";

interface MateriaInterface {
  _id: string;
  nombre: string;
  libro: LibroInterface;
}

export type { MateriaInterface };
