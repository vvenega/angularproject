import { Component, OnInit,ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ListingsService } from 'src/servicios/listings.service'
import { KafkaService } from 'src/servicios/kafka.service';
import { ListingDetail } from 'src/modelos/listingdetail.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
//import { ContactComponent } from '../contact/contact.component';
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

  objectid: string="";
  owner: string="";
  user: User=new User();
  public event:string="normal";

  public listingdetail:ListingDetail=new ListingDetail();

  constructor(private activatedRoute: ActivatedRoute,private listingservice: ListingsService,
    private el: ElementRef,private dialog:MatDialog,private loginService:LoginService,
    private kafkaService:KafkaService) {

   }

  ngOnInit() {

    /*this.activatedRoute.queryParams.subscribe(params => {
        this.objectid = params['objectid'];
        this.user='vvenega';
        alert(params);
      });*/

      if( this.activatedRoute!=null &&
         this.activatedRoute.snapshot!=null &&
         this.activatedRoute.snapshot.paramMap!=null &&
         this.activatedRoute.snapshot.paramMap.get("objectid")!=null)
      this.objectid=this.activatedRoute.snapshot.paramMap.get("objectid") || '';

      if(this.activatedRoute!=null &&
         this.activatedRoute.snapshot!=null &&
         this.activatedRoute.snapshot.paramMap!=null &&
         this.activatedRoute.snapshot.paramMap.get("owner")!=null)
      this.owner=this.activatedRoute.snapshot.paramMap.get("owner") || '';

      this.user=this.loginService.getSession();
      this.loginService.cancelChatStreaming();

      this.listingservice.getListingDetail(this.user.username,this.owner,this.objectid).subscribe(data => {this.listingdetail = data;});


  }


  openDialog(event: MouseEvent, listing: ListingDetail): void {
      const target = new ElementRef(event.currentTarget);
      const dialogConfig = new MatDialogConfig();

      for(var i = 0;i<listing.category.length;i++) {
      this.kafkaService.setEvent(listing.owner,listing.saleprice,listing.category[i],
        listing.type,listing.name,this.user.username,listing.objectid,'CONTACT',
        true,true);
      }




dialogConfig.data= { trigger: target,dataKey: listing,view:true, contact:true };
    //const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
  }




}
