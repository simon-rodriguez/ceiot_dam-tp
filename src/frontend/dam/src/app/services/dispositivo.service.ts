import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private uri = 'http://localhost:8000'

  constructor(private _http: HttpClient) { }

  // Listado de Dispositivos
  consulta () {
    return firstValueFrom(this._http.get(`${this.uri}/devices`))
  }

  // Obtener un solo dispositivo
  getDispositivo(deviceid:number) {
    return firstValueFrom(this._http.get(`${this.uri}/devices/${deviceid.toString()}`))
  }
  
  // Obtener última medición del dispositivo
  getUltimaMedicion(deviceid:number) {
    return firstValueFrom(this._http.get(`${this.uri}/lastmeasurement/${deviceid.toString()}`))
  }

  // Obtener todas las mediciones del dispositivo
  getMedicionesFull(deviceid:number){
    return firstValueFrom(this._http.get(`${this.uri}/measurements/${deviceid.toString()}`))
  }

  // Obtener todos los registros de riego del dispositivo
  getRegistroRiego(deviceid:number) {
    return firstValueFrom(this._http.get(`${this.uri}/waterlog/${deviceid.toString()}`))
  }

  // Insertar accion de electroválvula en el registro
  logAccionarValvula(deviceid:number, aperturaValvula:number) {
    let body = {
      apertura: aperturaValvula,
      fecha: (new Date()).toISOString().split('T')[0],
      electrovalvulaId: deviceid
    }
      this._http.post(`${this.uri}/changestate`, body).subscribe((res) => {
        console.log(res);
      });

  }

  // Insertar última medición en el registro
  logUltimaMedicion(deviceid:number, valorMedicion: number) {
    let body = {
      fecha: (new Date()).toISOString().split('T')[0],
      valor: valorMedicion,
      dispositivoId: deviceid
    }
    this._http.post(`${this.uri}/updatemeasurements`, body).subscribe((res) => {
      console.log(res);
    });
  }

}

