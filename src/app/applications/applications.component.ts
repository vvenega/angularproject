import { Component, OnInit,ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { LoginService } from 'src/servicios/login.service';
import {User } from 'src/modelos/user.model';
import {ProductRequested} from 'src/modelos/productrequested.model'
import { MatTableDataSource } from '@angular/material/table';
import {Group} from 'src/modelos/group.model'
//import {MessagecardComponent} from '../messagecard/messagecard.component';
import { ProductcardComponent } from '../productcard/productcard.component';
import { ProductrequestedService } from 'src/servicios/productrequested.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  owner:User=new User();
  displayedColumns: string[] = ['namerequester', 'email', 'mobile','fecharequerido', 'message'];
  HIDE_ALL:string="";
  detailsClicked:boolean=false;
  private _event:any="";


  //public dataSource: (ProductRequested | Group)[];
  public dataSource = new MatTableDataSource<ProductRequested | Group>([])


  constructor(private loginService:LoginService,
    private productrequestedservice: ProductrequestedService,private dialog:MatDialog) {
      this.HIDE_ALL='HIDE_ALL';
      this.detailsClicked=false;
   }

  ngOnInit(): void {

    this.owner=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.productrequestedservice.getProductsApplications(this.owner.username).subscribe(data => {

      this.dataSource.data=data;
      //this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);

       this.dataSource.filterPredicate = (data, filter) => {
         if(data.product==undefined)
          return true;
       else{

      const dataStr = data.product;
      //alert(dataStr);

      if(dataStr.indexOf(filter) == 0){
        data.visible=!data.visible;
        return data.visible;
      }else
        return data.visible;

       }
    }

     this.dataSource.filter=this.HIDE_ALL;

  });




}

  isGroup(index:any, item:any): boolean{
        return item.group;
      }


groupHeaderClick(row:any) {

  if(this.detailsClicked){

    this.detailsClicked=false;

    const target = new ElementRef(this._event.currentTarget);
      const dialogConfig = new MatDialogConfig();

      //this.listingservice.setEvent(this.owner.username,row.price,)
      //this.listingservice.setEventProductRequested(row.objectid,row.requester,this.owner.username,'PRODUCT_REQUESTED_VIEWED_BY_OWNER');

    dialogConfig.data= { trigger: target,prequested: row,eventname:'DETAIL_VIEW_APPLICATIONS',showsold:true };
    const dialogRef = this.dialog.open(ProductcardComponent, dialogConfig);

  }else{
   row.expanded = !row.expanded;
   this.dataSource.filter = row.group;

   //alert(row.requester);
   //this.listingservice.setEventProductRequested(row.objectid,row.requester,this.owner.username,'PRODUCT_REQUESTED_VIEWED');

  }

  }

  openDialog(event: MouseEvent, product: ProductRequested): void {
      const target = new ElementRef(event.currentTarget);
      const dialogConfig = new MatDialogConfig();

      //alert(product.requester);

        this.productrequestedservice.setEventProductRequested(product.objectid,product.requester,this.owner.username,'PRODUCT_REQUESTED_RED');




dialogConfig.data= { trigger: target,product: product };
    //const dialogRef = this.dialog.open(MessagecardComponent, dialogConfig);
  }


  details(event: MouseEvent):void{
    this.detailsClicked=true;
    this._event=event;
  }


}
