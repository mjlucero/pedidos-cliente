import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebardService } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SharedService, 
    SidebardService
  ],
  declarations: []
})
export class ServiceModule { }
