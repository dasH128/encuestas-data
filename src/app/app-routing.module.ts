import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const routes: Routes = [
  {
    path: '', component: EncuestaComponent, pathMatch: 'full' 
  },
  {
    path:'usuarios', component: UsuariosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
