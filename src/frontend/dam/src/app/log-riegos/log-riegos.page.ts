import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  registros: any = [];
  dispositivoId: string = '';
  ready: boolean = false; 

  constructor(private _LogServices: DispositivoService, private rutaActiva:ActivatedRoute) { }

  ngOnInit() {
    this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
    this._LogServices.getRegistroRiego(parseInt(this.dispositivoId))
    .then((respuesta:any) => {
      this.registros = respuesta;
      console.log(respuesta);
      this.ready = true;
      console.log("Registro de Riegos");
    })
      .catch((error) => {
      console.log(error)
    })
  }


}
