import { Injectable } from '@angular/core';
import {Group} from 'src/modelos/group.model';
import {ProductRequested} from "src/modelos/productrequested.model";
import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductrequestedService {

  private ChuckUrl = environment.productRequestedWS;//'http://192.168.1.66:8400'; // URL to web api
   private ChuckUrlKafka = environment.kafkaServiceWS;//'http://192.168.1.66:8002'; // URL to web api Kafka

  constructor(private http: HttpClient) { }

  public getProductsRequested(requester:string): Observable<ProductRequested[]>{

    let link =this.ChuckUrl +`/ProductsRequested/${requester}`;
    return this.http.get<ProductRequested[]>(link)


  }

  public getProductsApplications(owner:string): Observable<(ProductRequested | Group)[]>{

    let link =this.ChuckUrl +`/ProductsApplications/${owner}`;
    return this.http.get<(ProductRequested | Group)[]>(link)


  }

  public setEventProductRequested(objectid:number, requester:string,user:string,event:string): void {

      //let event = 'PRODUCT_REQUESTED_VIEW';
      let link =this.ChuckUrl +`/setProductRequestEvent/${objectid}/${requester}/${event}/${user}`;

    this.http.get(link).subscribe((res) => {
    let resStr = JSON.stringify(res);
    let resJSON = JSON.parse(resStr);
    //console.log(resJSON.body);
  })



  }


}
