import { Taller } from "./taller"

export class ComentarioClienteTaller{
  idComentario_Cliente_Taller: Number =0
  descripcion:string=""
  calificacion:number=0
  fechaComentario:Date=new Date(Date.now())
  taller:Taller= new Taller()
}






