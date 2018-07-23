import { Routes, RouterModule } from '@angular/router';

//Guards
import { LoginGuard } from '../services/service.index';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { DomicilioComponent } from './domicilios/domicilio.component';
import { DomiciliosComponent } from './domicilios/domicilios.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticuloComponent } from './articulos/articulo.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido.component';


const pageRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    //Administracion
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Administacion de usuarios' } },
    { path: 'rubros', component: RubrosComponent, data: { titulo: 'Administacion de rubros' } },
    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Administacion de clientes' } },
    { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Actualizar cliente' } },
    { path: 'domicilios', component: DomiciliosComponent, data: { titulo: 'Administracion de domicilios' } },
    { path: 'domicilio/:id', component: DomicilioComponent, data: { titulo: 'Actualizar domicilio' } },
    { path: 'articulos', component: ArticulosComponent, data: { titulo: 'Administracion de articulos' } },
    { path: 'articulo/:id', component: ArticuloComponent, data: { titulo: 'Actualizar articulo' } },
    { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Administracion de pedidos' } },
    { path: 'pedido/:id', component: PedidoComponent, data: { titulo: 'Actualizar pedido' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
