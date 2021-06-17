import { Component, OnInit,ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductRequested} from 'src/modelos/productrequested.model'
import {Group} from 'src/modelos/group.model'
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';
import { ProductcardComponent } from '../productcard/productcard.component';
import { ProductrequestedService } from 'src/servicios/productrequested.service';
import { ListingsService } from 'src/servicios/listings.service';
import { KafkaService } from 'src/servicios/kafka.service';

@Component({
  selector: 'app-requested',
  templateUrl: './requested.component.html',
  styleUrls: ['./requested.component.scss']
})
export class RequestedComponent implements OnInit {

  requester:User=new User();
  displayedColumns: string[] = ['namerequester', 'email', 'mobile', 'saw','red','sold'];
  HIDE_ALL:string="";
  private isVisible:boolean=true;

   public dataSource = new MatTableDataSource<ProductRequested | Group>([])

  constructor(private productrequestedservice: ProductrequestedService,private loginService:LoginService,
   private listingservice: ListingsService,private dialog:MatDialog,
   private kafkaService:KafkaService) {
    this.HIDE_ALL='HIDE_ALL';

  }


  ngOnInit(): void {


    this.requester=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.productrequestedservice.getProductsRequested(this.requester.username).subscribe(data => {

      this.dataSource.data=data;
      this.isVisible=false;
      //alert(data[3].product);

       this.dataSource.filterPredicate = (data, filter) => {
         if(data.nameowner==undefined)
          return true;
       else{

      const dataStr = data.nameowner;

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
   row.expanded = !row.expanded;
   this.dataSource.filter = row.group;

   this.kafkaService.setEvent(row.owner,row.price,"N-A",
        "N-A",row.product,this.requester.username,row.objectid,'EXPAND_DETAIL_REQUESTED',
        false,false);

  }


  openDialog(event: MouseEvent, product: ProductRequested): void {
      const target = new ElementRef(event.currentTarget);
      const dialogConfig = new MatDialogConfig();

   dialogConfig.data= { trigger: target,prequested: product,eventname:'DETAIL_VIEW_REQUESTER',showsold:false };
   const dialogRef = this.dialog.open(ProductcardComponent, dialogConfig);
  }

  isSpinnerVisible(){
    return this.isVisible;
  }


}
