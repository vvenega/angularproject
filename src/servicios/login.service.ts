import { Injectable,EventEmitter,Output } from '@angular/core';
import { User } from 'src/modelos/user.model'
import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import {RsocketService} from 'src/servicios/rsocket.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private ChuckUrl = environment.loginServiceWS;//'http://192.168.1.66:8004'; // URL to web api
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInEcommunities: EventEmitter<any> = new EventEmitter();
  private rsocketService:RsocketService=new RsocketService();


  constructor(private http: HttpClient,private _router:Router) { }

    public validateUser(user:string, password:string):Observable<User> {
      return this.http.get<User>(this.ChuckUrl + `/ValidatePassword/${user}/${password}`);

  }

  public setRSocketService(rsocketService:RsocketService){
    this.rsocketService=rsocketService;
  }

  public saveSession(user:User){

    localStorage.setItem('session', JSON.stringify(user));

  }

  public getSession():User{

   let jsonuser = localStorage.getItem('session');
   let user:User=new User();

   //this.cancelChatStreaming();

   if(jsonuser!=null){

   user  = JSON.parse(jsonuser);
   if(user==null || !user.valid || user==undefined){

    this.getLoggedInName.emit("");
    let ecommunities:string[];
    ecommunities=[];
    this.getLoggedInEcommunities.emit(ecommunities);

    this._router.navigate(['/login']);

    return user;

   }else
   return user;
 }else
   this._router.navigate(['/login']);

   return user;


  }

  public logout(){

    localStorage.removeItem('session');
    localStorage.clear();
    this.getLoggedInName.emit("");

    let ecommunities:string[];
    ecommunities=[];
    this.getLoggedInEcommunities.emit(ecommunities);

    this.cancelChatStreaming();

    this._router.navigate(['/login']);

  }

  public cancelChatStreaming(){
    if(this.rsocketService!=undefined && this.rsocketService.requestChannelClientSubscription!=undefined
    && this.rsocketService.requestChannelClientSubscription._subscription!=undefined)
      this.rsocketService.requestChannelClientSubscription._subscription.cancel();

    if(this.rsocketService!=undefined && this.rsocketService.requestChannelServerSubscription!=undefined
    && this.rsocketService.requestChannelServerSubscription!="")
      this.rsocketService.requestChannelServerSubscription.cancel();
  }
}
