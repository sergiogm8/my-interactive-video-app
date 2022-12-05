import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppComponent } from './app.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'video', component: VideoComponent },
  { path: 'estadisticas', component: EstadisticaComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }