import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config'

import { TipoPlataforma } from '../models/tipoplataforma';
import { Agrupamiento } from '../models/agrupamiento';
import { Sitio } from '../models/sitio';


@Injectable()
export class EventoService {

  _apiUrl = "http://10.4.5.142/server-app-tiquetes/controllers/afectados.php";

  constructor(private _http: HttpClient) { }

  obtener_tipos_plataformas(): Observable<TipoPlataforma[]> {
    return this._http.get<TipoPlataforma[]>(config.urlApi + '?tipo-elemento');
  }

  obtener_agrupamientos(): Observable<Agrupamiento[]> {
    return this._http.get<Agrupamiento[]>(config.urlApi + '?agrupamientos');
  }

  obtener_sitios(): Observable<Sitio[]> {
    return this._http.get<Sitio[]>(config.urlApi + '?sitios')
  }

  obtener_enlaces(tipoElemento: any, sitio?: any, agrupamiento?: any): Observable<any[]> {

    if (agrupamiento === undefined) {
      return this._http.get<any[]>
        (config.urlApi + `?elementos=1&opt=0&te=${tipoElemento}&sitio=${sitio}`)
    } else if ((sitio === undefined || sitio !== undefined) && agrupamiento !== undefined) {
      if (sitio !== undefined) {
        return this._http.get<any[]>
          (config.urlApi + `?elementos=1&opt=1&te=${tipoElemento}&sitio=${sitio}&agrupamiento=${agrupamiento}`)
      }
      if (sitio === undefined) {
        return this._http.get<any[]>
          (config.urlApi + `?elementos=1&opt=1&te=${tipoElemento}&agrupamiento=${agrupamiento}`);
      }
    }
  }

  obtener_diagnosticos(): Observable<any[]> {
    return this._http.get<any[]>(config.urlApi + '?diagnosticos');
  }

  obtener_directorio_personas(): Observable<any[]> {
    return this._http.get<any[]>(config.urlApi + '?asignar');
  }


  nuevo_evento(evento: any): Observable<any> {
    return this._http.post(config.urlApi + '?nuevo-evento', evento);
  }



  elementos_afectados(tipoElemento,sitio): Observable<any[]> {

    return this._http.get<any[]>(`${this._apiUrl}?afectados&tipoElemento=${tipoElemento}&sitio=${sitio}`)
  }

  plataformas_afectadas(): Observable<any[]> {

    return this._http.get<any[]>(`${this._apiUrl}?plataformas`)
  }

}
