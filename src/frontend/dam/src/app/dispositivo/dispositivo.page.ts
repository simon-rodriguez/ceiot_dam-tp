import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, delay, interval } from 'rxjs';


@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
  })

  
export class DispositivoPage implements OnInit {

//    observable$: Observable<any>
//    subscription: Subscription
    public valvulaAbierta = true
    dispositivos: any = []
    dispositivoId: string = ''
    ready: boolean = false;

    constructor(private _DispositivoService: DispositivoService, private rutaActiva: ActivatedRoute) {
//        this.observable$ = interval(1000)
//        this.subscription = this.observable$.subscribe((integer) => {
//          console.log(integer)
//        })
    }

    async ngOnInit() { 
        this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
        const respuesta = await this._DispositivoService.getDispositivo(parseInt(this.dispositivoId));
        this.dispositivos = respuesta;

        this._DispositivoService.getUltimaMedicion(parseInt(this.dispositivoId))
        .then(medicion => {medicion})

        this.ready = true;
    }

    ionViewWillEnter () {

    }

    abrirValvula() {
        console.log("Válvula abierta")
        this.valvulaAbierta = true;
    }

    cerrarValvula(){
        console.log("Válvula cerrada")
        this.valvulaAbierta = false;
    }


/*
    subscribe() {
        this.subscription = this.observable$.subscribe((integer) => {
            console.log(integer)
        })
    }
    
    unsubscribe() {
        this.subscription.unsubscribe()
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
*/


}