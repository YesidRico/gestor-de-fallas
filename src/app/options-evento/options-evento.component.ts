import { Component} from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-options-evento',
  templateUrl: './options-evento.component.html',
  styleUrls: ['./options-evento.component.css'],
  providers:[NgbTabsetConfig]
})
export class OptionsEventoComponent{

  constructor(config: NgbTabsetConfig) {

      config.justify = 'center';
      config.type = 'pills';
   }


}
