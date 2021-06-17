import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ListingsComponent } from './listings/listings.component';
import { FiltercategorypriceComponent } from './filtercategoryprice/filtercategoryprice.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RequestedComponent} from './requested/requested.component';
import {ProductcardComponent} from './productcard/productcard.component';
import {ApplicationsComponent} from './applications/applications.component';
import {MiscargasComponent} from './miscargas/miscargas.component';
import {PostuploadComponent} from './postupload/postupload.component';
import {MispostsComponent} from './misposts/misposts.component';
import {ChatroomsComponent} from './chatrooms/chatrooms.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'listing', component:  ListingsComponent },
  { path: 'listing/:user/:category', component:  ListingsComponent },
  { path: 'listing/:user/:category/:price', component:  ListingsComponent },
  { path: 'listing/:user/:category/:listings/:rentals/:donations', component:  ListingsComponent },
  { path: 'productdetail/:objectid/:owner', component:  ProductdetailComponent },
  { path: 'requested', component:  RequestedComponent },
  { path: 'productcard', component:  ProductcardComponent },
  { path: 'applications', component:  ApplicationsComponent },
  { path: 'miscargas', component: MiscargasComponent},
  { path: 'postupload', component: PostuploadComponent},
  { path: 'misposts', component: MispostsComponent},
  { path: 'misconversaciones/:objectid/:owner/:name/:id/:price/:product/:event', component: ChatroomsComponent},
  { path: 'misconversaciones', component: ChatroomsComponent},
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MenuComponent,LoginComponent,
  ListingsComponent,FiltercategorypriceComponent,
ProductdetailComponent,RequestedComponent,ProductcardComponent,
ApplicationsComponent,MiscargasComponent,PostuploadComponent,
MispostsComponent,ChatroomsComponent]
