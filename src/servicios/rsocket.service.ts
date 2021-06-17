import { Injectable,Output,EventEmitter } from '@angular/core';
import {RSocketClient, JsonSerializer,IdentitySerializer} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import { environment } from 'src/environments/environment';
import { Message } from 'src/modelos/message.model';

const {Flowable, Single} = require('rsocket-flowable');

export const WS_ENDPOINT = environment.wsEndpoint;
export const MIME_TYPE="";




@Injectable({
  providedIn: 'root'
})
export class RsocketService {

  private client:any='';
  public socket:any='';
  private cancel:any='';
  public message:Message=new Message();
  private messageSent:Message[]=[];
  public messageReceived:Message=new Message();
  public requestChannelClientSubscription:any="";
  public requestChannelServerSubscription:any="";


  constructor() {

    this.client=new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer,
        },
        setup: {

            keepAlive: 10000,

            lifetime: 20000,
            dataMimeType: 'application/json',
             metadataMimeType: 'message/x.rsocket.routing.v0',
             

        },
        transport: new RSocketWebSocketClient({url: WS_ENDPOINT}),
    });

    }

    connect() {
       return new Promise(((resolve, reject) => {

           this.client.connect().subscribe({
               onComplete: (s:any) => {
                   this.socket = s;
                   resolve(this.socket);
                   console.log('complete');
               },
               onError: (error:any) => {
                 console.log('error:'+error);
                 reject(error);
               },
               onSubscribe: (cancel:any) => {
                 this.cancel = cancel;
                 console.log('cancel:'+cancel);
               }
           });
       }));


   }

   openChannel(channel:string) {

     //let requestChannelClientSubscription:any="";
     //let requestChannelServerSubscription:any="";

     let cancelled = false;
     let index = 0;

     let flow = new Flowable((subscriber:any) => {
     this.requestChannelClientSubscription = subscriber;
     this.requestChannelClientSubscription.onSubscribe({
        cancel: () => {
            cancelled = true;
        },
        request: (n:any) => {
            let intervalID = setInterval(() => {
                if (!cancelled) {
                    let msg:Message | undefined=this.dequeue();
                    if(msg!=undefined){
                      this.message=msg;
                      subscriber.onNext(msg);

                    }


                } else {
                    console.log('else');
                }
            }, 1000);
        }
    });
});


    return flow;

    }


    sendMessage(message:Message){
      this.messageSent.push(message);
    }

    dequeue(): Message | undefined {
    return this.messageSent.shift();
  }

}
