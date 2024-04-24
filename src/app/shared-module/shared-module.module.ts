import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../my-service.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { materialmodule } from '../materials-module.service';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, FormsModule, NgxPaginationModule,
    materialmodule,
    MatTableModule,
    NgxUiLoaderModule,
    // NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground:true}),
    ToastrModule.forRoot(),
  ],
  providers:[DataService, DatePipe],
})
export class SharedModuleModule { }