import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/servicios/login.service';
import { FileserviceService } from 'src/servicios/fileservice.service';
import {User } from 'src/modelos/user.model';
import { FileLoad } from 'src/modelos/fileload.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-miscargas',
  templateUrl: './miscargas.component.html',
  styleUrls: ['./miscargas.component.scss']
})
export class MiscargasComponent implements OnInit {

  displayedColumns: string[] = ['date', 'filename', 'status','outputfile'];
  user:User=new User();
  private isVisible:boolean=true;
  //public myloads: FileLoad[];
  public dataSource = new MatTableDataSource<FileLoad>([])

  constructor(private loginService:LoginService,private fileService:FileserviceService) { }

  ngOnInit(): void {
    this.user=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.fileService.getFileLoads(this.user.username).subscribe(data => {
      this.dataSource.data=data;
      this.isVisible=false;
    });

  }

  download(filename:string): void {
    //alert(filename);
    this.fileService.download(filename,this.user.username)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'file.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  isSpinnerVisible(){
    return this.isVisible;
  }

}
