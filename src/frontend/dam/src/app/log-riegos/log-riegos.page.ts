import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  dispositivos: any = [];
  dispositivoId: string = '';
  ready: boolean = false; 

  constructor(private _LogServices: DispositivoService, private rutaActiva:ActivatedRoute) { }

  ngOnInit() {
    this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
    const respuesta = this._LogServices.getRegistroRiego(parseInt(this.dispositivoId));
    this.dispositivos = respuesta;
    console.log(respuesta); 
    console.log("Registro de Riegos");
    this.ready = true;
  }


}
