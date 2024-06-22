import { Dispositivo } from "./dispositivo"
import { Taller } from "./taller"

export class DispositivoTaller{
    idDispositivoTaller: number = 0
    dispositivo: Dispositivo = new Dispositivo()
    taller: Taller = new Taller()
}