import { Injectable } from '@angular/core';
import { UserConversation } from 'src/modelos/userconversation.model';
import { Message } from 'src/modelos/message.model';
import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ChuckUrl = environment.chatServiceWS;//'http://192.168.1.66:8008';

  constructor(private http: HttpClient) { }

  public getConversation(idConversation:string): Observable<Message[]> {

      return this.http.get<Message[]>(this.ChuckUrl + `/GetConversation/${idConversation}`);
  }

  public getConversations(username:string): Observable<UserConversation[]> {
      return this.http.get<UserConversation[]>(this.ChuckUrl + `/GetConversations/${username}`);
  }
}
