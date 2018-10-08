import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';

import { AgmCoreModule } from '@agm/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BuscadorComponent } from '../components/buscador/buscador.component';
import { ModalDomicilioComponent } from '../components/modal-domicilio/modal-domicilio.component';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        BuscadorComponent,
        ModalDomicilioComponent,
        AutocompleteComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        BuscadorComponent,
        ModalDomicilioComponent,
        AutocompleteComponent
    ],
    providers: []
})
export class SharedModule {}