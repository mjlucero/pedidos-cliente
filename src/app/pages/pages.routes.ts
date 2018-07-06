import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { LoginGuard } from '../services/service.index';
import { RubrosComponent } from './rubros/rubros.component';


const pageRoutes: Routes = [
    {   
        path: '', 
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            //Administracion
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Administacion de usuarios' } },
            { path: 'rubros', component: RubrosComponent, data: { titulo: 'Administacion de rubros' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
