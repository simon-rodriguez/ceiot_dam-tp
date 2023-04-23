import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, delay, interval } from 'rxjs';


declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
  })

  
export class DispositivoPage implements OnInit {


    // Para el Highcharts
    private valorObtenido:number=0;
    public myChart:any;
    private chartOptions:any;

//    observable$: Observable<any>
//    subscription: Subscription
    private aperturaValvula: number = 1
    public valvulaAbierta = false
    dispositivos: any = []
    mediciones: any = []
    dispositivoId: string = ''
    ready: boolean = false;
    intervalo: any;



    constructor(private _DispositivoService: DispositivoService, private rutaActiva: ActivatedRoute) {
        this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
        this.getMedicionLog();
        setTimeout(()=>{
            this.valorObtenido = parseFloat(this.mediciones[0].valor)
            console.log("Medicion Inicial");
            this.refreshChart();
          },3000);
    }

    ngOnInit() { 
        console.log(this.dispositivoId)
        this._DispositivoService.getDispositivo(parseInt(this.dispositivoId))
        .then((respuesta:any) => {
            console.log(respuesta)
            this.dispositivos = respuesta;
            this.ready = true;
        })
        .catch((error) => {
            console.log(error)
            this.ready = false;
        });
        
        this.intervalo = setInterval(() => {
            this.getMedicionSensor();
            this.refreshChart();
            }, 5000);

    }

    ionViewWillEnter () {

    }
    
    // Para el highcharts
    ionViewDidEnter() {
    this.generarChart();
    }

    refreshChart() {
        this.myChart.update({series: [{
            name: 'kPA',
            data: [this.valorObtenido],
            tooltip: {
                valueSuffix: ' kPA'
            }
        }]});
    }

    generarChart() {
        this.chartOptions={
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
            }
            ,title: {
            text: 'Sensor N° ' + this.dispositivoId
            }

            ,credits:{enabled:false}
            
            
            ,pane: {
                startAngle: -150,
                endAngle: 150
            } 
            // the value axis
        ,yAxis: {
            min: 0,
            max: 100,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'kPA'
            },
            plotBands: [{
                from: 0,
                to: 10,
                color: '#55BF3B' // green
            }, {
                from: 10,
                to: 30,
                color: '#DDDF0D' // yellow
            }, {
                from: 30,
                to: 100,
                color: '#DF5353' // red
            }]
        }
        ,
    
        series: [{
            name: 'kPA',
            data: [this.valorObtenido],
            tooltip: {
                valueSuffix: ' kPA'
            }
        }]

        };
        this.myChart = Highcharts.chart('highcharts', this.chartOptions );
    }

    // Optiene la ultima medición en el registro.
    getMedicionLog () {
        this.dispositivoId = this.rutaActiva.snapshot.paramMap.get('id')!;
        this._DispositivoService.getUltimaMedicion(parseInt(this.dispositivoId))
        .then((respuesta:any) => {
            console.log("getMedicionLog ejecutado")
            console.log(respuesta)
            this.mediciones = respuesta;
            return this.mediciones;
        })
        .catch((error) => {
            console.log(error)
          })
    }

    // Obtiene la última medición en el sensor (o simulación)
    getMedicionSensor () {
        this.getMedicionLog();
        console.log("Sensor simulado")
        console.log(this.valorObtenido)
        this.valorObtenido = parseFloat(this.mediciones[0].valor)
        this.valorObtenido = this.valorObtenido + 1
        console.log("Nuevo valor: ", this.valorObtenido)
        this._DispositivoService.logUltimaMedicion(parseInt(this.dispositivoId), this.valorObtenido);
        return this.valorObtenido;
    }

    abrirValvula() {
        this.aperturaValvula = 1;
        console.log("Válvula abierta");
        this._DispositivoService.logAccionarValvula(parseInt(this.dispositivoId), this.aperturaValvula);
        this.valvulaAbierta = true;
    }

    cerrarValvula(){
        console.log("Válvula cerrada")
        this.aperturaValvula = 0;
        this._DispositivoService.logAccionarValvula(parseInt(this.dispositivoId), this.aperturaValvula);
        const ultimaMedicion = this.getMedicionSensor();
        this._DispositivoService.logUltimaMedicion(parseInt(this.dispositivoId), ultimaMedicion);
        this.valvulaAbierta = false;
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalo);
    }


}