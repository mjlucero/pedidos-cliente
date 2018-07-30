import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

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

import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    DashboardComponent,
    GraficasComponent, 
    ProfileComponent, 
    UsuariosComponent,
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
      ReactiveFormsModule,
      PipesModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDOP6i326mY32uBmQMc9-yxg0T6ink5-rE',
        libraries: ["places"]
      })
    ],
  exports: [
    DashboardComponent, 
    GraficasComponent
  ],
  providers: [

  ]
})
export class PagesModule {}
