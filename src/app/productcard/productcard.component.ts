import { Component, OnInit,ElementRef,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogConfig} from "@angular/material/dialog";
import { LoginService } from 'src/servicios/login.service';
import {ListingsService} from 'src/servicios/listings.service';
import {User } from 'src/modelos/user.model';
import {Listing} from 'src/modelos/listing.model';
import { ProductRequested } from 'src/modelos/productrequested.model';
import { ProductrequestedService } from 'src/servicios/productrequested.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent implements OnInit {

  private user:User=new User();
  public  listing:Listing=new Listing();
  private prequested:any="";
   //private readonly dialog: MatDialogRef<ProductcardComponent>=new MatDialogRef<ProductcardComponent>();
   //private readonly triggerElementRef: ElementRef=new ElementRef();
   private eventname:string="";
   public showsold:boolean=false;

  constructor(dialogRef: MatDialogRef<ProductcardComponent>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, prequested:any,eventname:string,showsold:boolean},private loginService:LoginService,
              private listingservice:ListingsService,private productrequestedservice: ProductrequestedService,
            private readonly dialog: MatDialogRef<ProductcardComponent>,
          private readonly triggerElementRef: ElementRef) {

                this.user=this.loginService.getSession();
                this.prequested=data.prequested;
                this.dialog = dialogRef;
                 this.triggerElementRef = data.trigger;
                 this.showsold=data.showsold;
                 this.eventname=data.eventname;


                 this.listingservice.getProductDescription(this.prequested.objectid,this.user.username,this.prequested.price).subscribe(data => this.changeListing(data));



               }

  ngOnInit(): void {

     const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left+50}px`, top: `${rect.bottom}px`};
    matDialogConfig.width = '600px';
    matDialogConfig.height = '280px';
    this.dialog.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.dialog.updatePosition(matDialogConfig.position);


  }

  close() {
        this.dialog.close();
    }


    setAsSold(){
      /*alert(this.prequested.objectid);
      alert(this.prequested.requester);
      alert(this.user.username);*/
      this.productrequestedservice.setEventProductRequested(this.prequested.objectid,"N-A",this.user.username,'PRODUCT_REQUESTED_SOLD');
      close();
    }

    private changeListing(listing: Listing): void {

            this.listing = listing;
            //alert(this.listing.name);

        }

}
