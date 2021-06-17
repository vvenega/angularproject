import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FileserviceService } from 'src/servicios/fileservice.service';
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-postupload',
  templateUrl: './postupload.component.html',
  styleUrls: ['./postupload.component.scss']
})

export class PostuploadComponent implements OnInit {

  user:User=new User();
  private isVisible:boolean=false;

  constructor(private fileservice:FileserviceService,private loginService:LoginService) {
    this.user=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
  }

  ngOnInit(): void {
  }

  uploadToServer(){

    this.isVisible=true;
    this.fileservice.uploadtoserver(this.files,this.user.username).subscribe((res:any)=>{
        console.log(res.body);
        if(res.body!=undefined && res.body=='succesfull'){
         this.isVisible=false;
         alert('Se cargaron los archivos con Exito');
       }

      });
  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl: any="";

  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event:any) {
    let files =$event.target.files;
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }


  isSpinnerVisible(){
    return this.isVisible;
  }


}
