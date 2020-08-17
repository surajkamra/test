import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { StorageService } from './_services/loader.service';
import { RestService } from './_services/rest.service';
import { LoaderService } from './_services/loader.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RestService,
    LoaderService,
  ]
})
export class ServicesModule { }
