import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";


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
    DashboardComponent,
    GraficasComponent, 
    ProfileComponent, 
    UsuariosComponent,
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
      NgSelectModule,
      ReactiveFormsModule,
      PipesModule
    ],
  exports: [
    DashboardComponent, 
    GraficasComponent
  ],
  providers: [

  ]
})
export class PagesModule {}
