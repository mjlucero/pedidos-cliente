import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule } from '@angular/forms'
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

import { PagesComponent } from "./pages.component";
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BuscadorComponent } from "../components/buscador/buscador.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraficasComponent } from "./graficas/graficas.component";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { DomiciliosComponent } from './domicilios/domicilios.component';
import { DomicilioComponent } from './domicilios/domicilio.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticuloComponent } from './articulos/articulo.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent, 
    ProfileComponent, 
    UsuariosComponent,
    ModalUploadComponent,
    BuscadorComponent,
    RubrosComponent,
    ClientesComponent,
    ClienteComponent,
    DomiciliosComponent,
    DomicilioComponent,
    ArticulosComponent,
    ArticuloComponent,
    PedidosComponent,
    PedidoComponent
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
    GraficasComponent,
    ModalUploadComponent
  ],
  providers: [

  ]
})
export class PagesModule {}
