import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule } from '@angular/forms'
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraficasComponent } from "./graficas/graficas.component";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { RubrosComponent } from './rubros/rubros.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent, 
    GraficasComponent, 
    ProfileComponent, 
    UsuariosComponent,
    ModalUploadComponent,
    RubrosComponent
  ],
  imports: [
      CommonModule,
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      PipesModule
    ],
  exports: [
    PagesComponent,
    DashboardComponent, 
    ProgressComponent,
    GraficasComponent,
    ModalUploadComponent
  ],
  providers: [

  ]
})
export class PagesModule {}
