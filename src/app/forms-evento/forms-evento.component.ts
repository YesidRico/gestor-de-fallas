import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EventoService } from '../services/evento.service';

import { TipoPlataforma } from '../models/tipoplataforma';
import { Agrupamiento } from '../models/agrupamiento';
import { Sitio } from '../models/sitio';


@Component({
  selector: 'app-forms-evento',
  templateUrl: './forms-evento.component.html',
  styleUrls: ['./forms-evento.component.css'],
  providers: [EventoService]
})
export class FormsEventoComponent implements OnInit {

  meridian = true;
  habilita: boolean = true;
  tipoElemento: number;
  evento: any = {}

  message = [{
    id: 1,
    body: `Los campos marcados (*) son obligatorios. Una vez realizado el registro se te dará
    a conocer el número del evento.`,
    type: 'info',
    info: '!Información¡',
    dismissible: true,
  }]

  _elementos_afectados: Array<any> = [];
  _plataformas_afectadas: Array<any> = [];
  elemento: any = {};

  _tiposPlataformas: Array<TipoPlataforma> = [];
  _agrupamiento: Array<Agrupamiento> = [];
  _sitios: Array<Sitio> = [];
  _enlaces: Array<any> = [];
  _diagnosticos: Array<any> = [];
  _personas: Array<any> = [];


  constructor(
    private _eventoService: EventoService,
    private _router: Router,
    private _modalService: NgbModal
  ) { }


  ngOnInit() {
    this.obtener_tipos_plataformas();
    this.obtener_agrupamientos();
    this.obtener_sitios();
    this.obtener_diagnosticos();
    this.obtener_directorio_personas();
    this.plataformas_afectadas();
  }


  private obtener_tipos_plataformas() {
    this._eventoService.obtener_tipos_plataformas()
      .subscribe(res => {
        this._tiposPlataformas = res;
      },
      err => {
        console.log(`Error al realizar la petición Método: (obtener_tipos_plataformas): ${err}`);
      })
  }

  private obtener_agrupamientos() {
    this._eventoService.obtener_agrupamientos()
      .subscribe(res => {
        this._agrupamiento = res;
      },
      err => {
        console.log(`Error al realizar la petición Método: (obtener_agrupamientos): ${err}`);
      })
  }

  private obtener_sitios() {
    this._eventoService.obtener_sitios()
      .subscribe(res => {
        this._sitios = res;
      },
      err => {
        console.log(`Error al realizar la petición Método: (obtener_sitios): ${err}`);
      })
  }

  public obtener_enlaces() {

    if (this.evento.agrupamiento === undefined) {
      this._eventoService
        .obtener_enlaces(this.evento.tipoElemento, this.evento.sitio)
        .subscribe(res => {
          this._enlaces = res;
          this.tipoElemento = this._enlaces[0].idTipoElemento;
        },
        err => {
          console.log(`Error al realizar la petición Método: (obtener_enlaces): ${err}`);
        });
    } else if ((this.evento.sitio === undefined || this.evento.sitio !== undefined) && this.evento.agrupamiento !== undefined) {
      this._eventoService
        .obtener_enlaces(this.evento.tipoElemento, this.evento.sitio, this.evento.agrupamiento)
        .subscribe(res => {
          this._enlaces = res;
          this.tipoElemento = this._enlaces[0].idTipoElemento;
        },
        err => {
          console.log(`Error al realizar la petición Método: (obtener_enlaces): ${err}`);
        },
        () => {
          if (this.tipoElemento === undefined) {
            this.tipoElemento = 6;
          }
        });
    }


  }

  obtener_diagnosticos() {
    this._eventoService.obtener_diagnosticos()
      .subscribe(res => {
        this._diagnosticos = res;
      },
      err => {
        console.log(`Error al realizar la petición Método: (obtener_diagnosticos): ${err}`);
      });
  }


  obtener_directorio_personas() {
    //let inicio = Date();
    //console.log(inicio);
    this._eventoService.obtener_directorio_personas()
      .subscribe(res => {
        this._personas = res;
      },
      err => {
        console.log(err);
      },
      () => {
        //let fin = Date();
        //console.log(fin);
      })
  }

  nuevo_evento() {
    this._eventoService.nuevo_evento(JSON.stringify(this.evento))
      .subscribe(res => {

        this.message[0].info = '!Éxito¡';
        this.message[0].type = 'success';
        this.message[0].body = `El evento se registro con éxito. El número del evento es: ${res}`;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log({ message: 'Acción completada.' });
      })
  }


  elementos_afectados() {
    this._eventoService.elementos_afectados(this.evento.tipoElemento,this.evento.sitio).subscribe(res => {
      this._elementos_afectados = res;
    },
      err => {
        console.log(`Error al realizar la petición: ${err.status}`);
      })
  }

  plataformas_afectadas() {
    this._eventoService.plataformas_afectadas().subscribe(res => {
      this._plataformas_afectadas = res;
    },
      err => {
        console.log(`Error al realizar la petición: ${err.status}`);
      })
  }

  openModal(content) {
    this._modalService.open(content, { windowClass: 'dark-modal' });
  }


  get diagnostic() {
    return JSON.stringify(this.evento);
  }

}
