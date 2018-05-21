import { NgModule } from "@angular/core";

import { PAGES_ROUTES } from "./pages.routes";

import { FormsModule } from '@angular/forms'

import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraficasComponent } from "./graficas/graficas.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent, 
    GraficasComponent
  ],
  imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule
    ],
  exports: [
    PagesComponent,
    DashboardComponent, 
    ProgressComponent,
    GraficasComponent
  ],
  providers: [

  ]
})
export class PagesModule {}
