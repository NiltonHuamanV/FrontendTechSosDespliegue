import { DispositivoTaller } from "./dispositivotaller";

export class Reparacion{
    idReparacion: number = 0;
    fechaInicio: Date=new Date(Date.now())
    fechaFin: Date=new Date(Date.now())
    problema: string = ""
    estado: string = ""
    costo: number = 0
    dispositivoTaller: DispositivoTaller = new DispositivoTaller()

}