import { Component, OnInit,HostListener,ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ListingsService } from 'src/servicios/listings.service';
import { KafkaService } from 'src/servicios/kafka.service';
import { Listing } from 'src/modelos/listing.model';
import{  User } from 'src/modelos/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  user: User=new User();
  category: string="";
  price: number=0;
  public event:string="normal";



  public myFeedListings: Listing[]=[];

  constructor(private activatedRoute: ActivatedRoute,private listingservice: ListingsService,
    private el: ElementRef,private dialog:MatDialog,private loginService:LoginService,
    private kafkaService:KafkaService) {
    this.category='N/A';
    this.event='contact';
  }

  ngOnInit() {

   this.user = this.loginService.getSession();
   this.loginService.cancelChatStreaming();


    this.activatedRoute.params.subscribe( params =>
    {
      //this.user = params["user"];
      this.category = params["category"];
      this.price=params["price"];
      this.user = this.loginService.getSession();


      if((this.category==null || this.category=='N-A') && this.price==null){
     this.listingservice.getListings(this.user.username,this.user.ecommunities,this.user.types).subscribe(data => {this.myFeedListings = data;});
      }
    else{
     if(this.category!=null && this.category!='N-A')
      this.listingservice.getListingsCategory(this.user.username,this.category,this.user.ecommunities,this.user.types).subscribe(data => {this.myFeedListings = data;});
     else if(this.price!=null)
      this.listingservice.getListingsPrice(this.user.username,this.price).subscribe(data => {this.myFeedListings = data;});
    }
    });



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




dialogConfig.data= { trigger: target,dataKey: listing,view:false, contact:true };
    //const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
  }






  sharePost(listing:Listing):void{
    //alert(listing.category);
    this.listingservice.sharePost(listing,this.user.username);
  }


}
