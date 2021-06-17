import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ListingsComponent } from './listings/listings.component';
import { FiltercategorypriceComponent } from './filtercategoryprice/filtercategoryprice.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RequestedComponent } from './requested/requested.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { MiscargasComponent } from './miscargas/miscargas.component';
import { PostuploadComponent } from './postupload/postupload.component';
import { ProgressComponent } from './progress/progress.component';
import { MispostsComponent } from './misposts/misposts.component';
import { ChatroomsComponent } from './chatrooms/chatrooms.component';
import { VideocallComponent } from './videocall/videocall.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    ListingsComponent,
    FiltercategorypriceComponent,
    ProductdetailComponent,
    RequestedComponent,
    ProductcardComponent,
    ApplicationsComponent,
    MiscargasComponent,
    PostuploadComponent,
    ProgressComponent,
    MispostsComponent,
    ChatroomsComponent,
    VideocallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
