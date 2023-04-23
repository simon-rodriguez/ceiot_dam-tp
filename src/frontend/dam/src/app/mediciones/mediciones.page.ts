import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  dispositivos: any = [];
  dispositivoId: string = '';
  ready: boolean = false; 
  
  constructor(private _MedicionesServices: DispositivoService, private rutaActiva:ActivatedRoute) { }

  ngOnInit() {
    this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
    const respuesta = this._MedicionesServices.getMedicionesFull(parseInt(this.dispositivoId));
    this.dispositivos = respuesta;
    console.log(respuesta);
    console.log("Tabla de Mediciones");
    this.ready = true;

  }

  

}
