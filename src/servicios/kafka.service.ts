import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KafkaService {


  private ChuckUrlKafka = environment.kafkaServiceWS;//'http://192.168.1.66:8002'; // URL to web api Kafka

  constructor(private http: HttpClient) {

  }

  public setEvent(owner: string,price: number,category:string,type:string, name:string, user:string,
    objectid: number, event:string, viewclick:boolean,contactclick:boolean): void {

      let params = new HttpParams();
      params.set('user', user);
      //`/ListingDetail`
      //alert(this.ChuckUrlKafka +`/RecordEvent/${owner}/${price}/${category}/${type}/${name}/${user}/${objectid}/${event}/${viewclick}/${contactclick}`);
      let link =this.ChuckUrlKafka +`/RecordEvent/${owner}/${price}/${encodeURIComponent(category)}/${type}/${encodeURIComponent(name)}/${user}/${objectid}/${event}/${viewclick}/${contactclick}`;

    this.http.get(link).subscribe((res) => {
    let resStr = JSON.stringify(res);
    let resJSON = JSON.parse(resStr);
    //console.log(resJSON.body);
  })



  }

  public setChat(owner: string,nameowner:string,requester:string,namerequester:string,product:string,price:string,objectid:string,idconversation:string): void {

    let link =this.ChuckUrlKafka +`/RecordChat/${owner}/${nameowner}/${requester}/${namerequester}/${objectid}/${price}/${encodeURIComponent(product)}/${idconversation}`;

    this.http.get(link).subscribe((res) => {
    let resStr = JSON.stringify(res);
    let resJSON = JSON.parse(resStr);
  })



  }
}
