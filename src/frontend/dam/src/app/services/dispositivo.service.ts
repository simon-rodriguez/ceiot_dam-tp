import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private url = 'http://localhost:8000'

  constructor(private _http: HttpClient) { }

  // Listado de Dispositivos
  consulta () {
    return firstValueFrom(this._http.get(`${this.url}/devices`))
  }

  // Obtener un solo dispositivo
  getDispositivo(deviceid:number) {
    return firstValueFrom(this._http.get(`http://localhost:8000/devices/${deviceid.toString()}`))
  }
  
  // Obtener última medición del dispositivo
  getUltimaMedicion(deviceid:number) {
    return firstValueFrom(this._http.get(`http://localhost:8000/lastmeasurement/${deviceid.toString()}`))
  }

  // Obtener todas las mediciones del dispositivo
  getMedicionesFull(deviceid:number){
    return firstValueFrom(this._http.get(`http://localhost:8000/measurements/${deviceid.toString()}`))
  }

  // Obtener todos los registros de riego del dispositivo
  getRegistroRiego(deviceid:number) {
    return firstValueFrom(this._http.get(`http://localhost:8000/waterlog/${deviceid.toString()}`))
  }

}

