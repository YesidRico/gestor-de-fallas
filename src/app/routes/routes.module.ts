import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { FormsEventoComponent } from '../forms-evento/forms-evento.component';
import { OptionsEventoComponent } from '../options-evento/options-evento.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'gestion-eventos', component: OptionsEventoComponent,
    children: [
      { path: 'nuevo-evento', component: FormsEventoComponent },
      {path: 'gestion-integral', component: FormsEventoComponent},
      {path: 'adicionar-diagnostico', component: FormsEventoComponent},
      {path: 'notificar-evento', component: FormsEventoComponent}
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
