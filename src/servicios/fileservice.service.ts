import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileLoad } from 'src/modelos/fileload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

   private ChuckUrl = environment.fileServiceWS;//;

  constructor(private http:HttpClient) { }

  uploadtoserver(selectedfiles:any[],username:string): Observable<HttpEvent<{}>>{


    const data: FormData=new FormData();

    for(let i=0;i<selectedfiles.length;i++){
        data.append('selectedfiles', selectedfiles[i]);
        data.append('username',username)
    }

    const newrequest=new HttpRequest('POST',this.ChuckUrl+'/uploadfile',data,{
    reportProgress: true,
    responseType: 'text'
    });

    return this.http.request(newrequest);
}

public getFileLoads(user: string): Observable<FileLoad[]> {
      return this.http.get<FileLoad[]>(this.ChuckUrl +`/getFileLoads/${user}`);
  }


  public download(filename: string,username:string): Observable<Blob> {
    return this.http.get(this.ChuckUrl +`/fileDownload/${username}/${filename}`, {
      responseType: 'blob'
    })
  }



}
