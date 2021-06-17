import { Component, OnInit,HostListener,ElementRef } from '@angular/core';
import {Category} from 'src/modelos/categories.model';
import { ListingsService } from 'src/servicios/listings.service';
import { KafkaService } from 'src/servicios/kafka.service';
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';
import { Listing } from 'src/modelos/listing.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
//import { ContactComponent } from '../contact/contact.component';
//import {MessagecardComponent} from '../messagecard/messagecard.component';
import { ProductRequested } from 'src/modelos/productrequested.model';

@Component({
  selector: 'app-misposts',
  templateUrl: './misposts.component.html',
  styleUrls: ['./misposts.component.scss']
})
export class MispostsComponent implements OnInit {

  public myCategories: Category[]=[];
  public myFeedListings: Listing[]=[];
  user: User=new User();

  constructor(private listingservice: ListingsService,private loginService:LoginService,private dialog:MatDialog,
    private kafkaService:KafkaService) { }

  ngOnInit(): void {

    this.user=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.listingservice.getUserCategories(this.user.username,this.user.ecommunities,this.user.types).subscribe(data => {this.myCategories = data;});

  }

  loadPosts(e:any):void{
    let category = e.target.value;
    this.listingservice.getUserListingsCategory(this.user.username,category,this.user.ecommunities,this.user.types).subscribe(data => {this.myFeedListings = data;});

  }

   @HostListener('mouseleave', ['$event'])
     mouseleave(listing:Listing) {

       // @HostListener('window:scroll') onScroll(listing:Listing) {
      if(listing!=undefined && listing.category!=undefined){

      console.log(listing.objectid);

      for(var i = 0;i<listing.category.length;i++) {
         this.kafkaService.setEvent(listing.owner,listing.saleprice,listing.category[i],
        listing.type,listing.name,this.user.username,listing.objectid,'VIEW',
        false,false);
}





      }
    }


    openDialog(event: MouseEvent, listing: Listing): void {
      const target = new ElementRef(event.currentTarget);
      const dialogConfig = new MatDialogConfig();

     /* this.listingservice.setEvent(listing.owner,listing.saleprice,listing.category,
        listing.type,listing.name,this.user.username,listing.objectid,'CONTACT',
        false,true);*/

let product:ProductRequested=new ProductRequested();
product.product=listing.name;
dialogConfig.data= { trigger: target,product: product };
    //const dialogRef = this.dialog.open(MessagecardComponent, dialogConfig);
  }

}
