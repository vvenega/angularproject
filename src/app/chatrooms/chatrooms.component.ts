import { Component, OnInit,Injectable,ElementRef,ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { KafkaService } from 'src/servicios/kafka.service';
import { ChatService } from 'src/servicios/chat.service';
import {RsocketService} from 'src/servicios/rsocket.service';
import {User} from 'src/modelos/user.model';
import {UserConversation} from 'src/modelos/userconversation.model';
import {Chatter} from 'src/modelos/chatter.model';
import {CallService} from 'src/servicios/call.service';
import { Message } from 'src/modelos/message.model';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Subscription,Observable,of } from 'rxjs';
import { LoginService } from 'src/servicios/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import {ProductRequested} from 'src/modelos/productrequested.model'
import { ProductcardComponent } from '../productcard/productcard.component';
import { DialogData,VideocallComponent } from '../videocall/videocall.component';
import { filter, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.scss']
})
export class ChatroomsComponent implements OnInit {

  public  user: User=new User();
  //private serverUrl = 'http://192.168.1.66:8008/socket'
  private title = 'WebSockets chat';


  //private stompClient;
  public typing:string="";
  private receiver:string="";
  private channel:string="";
  public name:string="";
  private objectid:string="";
  private id:string="";
  private price:string="";
  private product:string="";
  private event:string="";
  private description:string="";

  public currentConversation: Message[]=[];
  public currentIincomingMessages:Message[]=[];
  public userConversations: UserConversation[]=[];
  public dataSource = new MatTableDataSource<UserConversation | Chatter>([]);
  public displayedColumns: string[] = ['objectid'];

  private isVisible:boolean=true;
  private detailsClicked:boolean=false;
  private _event:any="";
  private HIDE_ALL='';

   //Video Call ---------------------------------------------------------

  public isCallStarted$: Observable<boolean>=new Observable<true>();
  private peerId: string="";

  @ViewChild('localVideo') localVideo: any="";
  @ViewChild('remoteVideo') remoteVideo: any="";
  public videocall:boolean=false;

   //----------------------------------------------------------------------

  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private chatService:ChatService,
    private kafkaService:KafkaService, private rsocketService:RsocketService,private dialog:MatDialog,
  private callService: CallService) {
    this.user = this.loginService.getSession();
    this.currentConversation=[];
    this.userConversations=[];
    this.HIDE_ALL='HIDE_ALL';
   }

   initializeWebSocketConnection(){


     this.rsocketService = new RsocketService();
     this.loginService.setRSocketService(this.rsocketService);

         this.rsocketService.connect()
             .then(sub => {
                 console.log('sub');


                 let cancelled = false;
                 let index = 0;

                 let flow =this.rsocketService.openChannel('vvenega');

                 this.rsocketService.socket.requestChannel((flow.map((msg:Message | undefined) => {
                return {
                    data: this.rsocketService.message,
                    metadata: String.fromCharCode('channel'.length) + 'channel'
                };
            })))
                 .subscribe({


                   onSubscribe: (sub:any) => {

                      this.rsocketService.requestChannelServerSubscription = sub;
                     console.log(`Client is establishing a channel`);
                      this.rsocketService.requestChannelServerSubscription.request(0x7fffffff);

                   },
                   onNext: (response:any) => {
                     //console.log(response);
                     //console.log('response');
                     console.log(response.data.message);
                     let messageReceived=new Message();
                     messageReceived.message=response.data.message;
                     messageReceived.date=response.data.date;
                     messageReceived.sender=response.data.sender;
                     messageReceived.receiver=response.data.receiver;
                     messageReceived.channel=response.data.channel;
                     messageReceived.objectid=response.data.objectid;
                     messageReceived.namesender=response.data.namesender;
                     messageReceived.namereceiver=response.data.namereceiver;
                     messageReceived.idconversation=response.data.idconversation;
                     messageReceived.id=response.data.id;


                     if(this.name!=undefined && this.name==messageReceived.namesender){
                       if(!messageReceived.message.startsWith('@protocol')) /*&& !messageReceived.message.startsWith('@protocol_videocall$')
                       && !messageReceived.message.startsWith('@protocol_answer_videocall$')
                     && !messageReceived.message.startsWith('@protocol_finish_videocall$'))*/
                        this.currentConversation.push(messageReceived);
                       else if(messageReceived.message.startsWith('@protocol_videocall$')){

                         let cad:string=messageReceived.message;

                         let pid:string= cad.substring(cad.indexOf('$')+1);
                         //alert(pid);
                         this.processRequestVideoCall(pid);

                       }else if(messageReceived.message.startsWith('@protocol_answer_videocall$')){

                         let cad:string=messageReceived.message;
                         let pid:string= cad.substring(cad.indexOf('$')+1);

                         this.processAnswerVideoCall(pid);

                       }else if(messageReceived.message.startsWith('@protocol_finish_videocall$')){

                         this.endCall();
                         alert("Llamada Finalizada por Interlocutor.")

                       }else if(messageReceived.message.startsWith('@protocol_reject_videocall$')){

                         this.isVisible=false;
                         //this.endCall();
                         alert("Llamada Rechazada por Interlocutor.")

                       }

                     }else{
                        messageReceived.message=messageReceived.namesender+" dice:"+ messageReceived.message;
                        this.currentIincomingMessages.push(messageReceived);
                      }

                      this.rsocketService.requestChannelServerSubscription.request(1);

                   },
                   onComplete: () => {
                     console.log('Client received end of server stream');
                   }
                 });
             })
             .then(profile => {
                 console.log('then');
             });

  }

  ngOnInit(): void {
    this.user=this.loginService.getSession();

    this.objectid=this.activatedRoute.snapshot.paramMap.get("objectid") || '';
    this.receiver=this.activatedRoute.snapshot.paramMap.get("owner") || '';
    this.name=this.activatedRoute.snapshot.paramMap.get("name") || '';
    this.id=this.activatedRoute.snapshot.paramMap.get("id") || '';
    this.price=this.activatedRoute.snapshot.paramMap.get("price") || '0';
    this.product=this.activatedRoute.snapshot.paramMap.get("product") || '';
    this.event=this.activatedRoute.snapshot.paramMap.get("event") || '';

    this.channel= 'mychannel_'+this.user.username;


    this.chatService.getConversations(this.user.username).subscribe(data => {
      //this.userConversations = data;
      this.dataSource.data=data;
      console.log(data);
      this.isVisible=false;

      this.dataSource.filterPredicate = (data, filter) => {
        if(data.name==undefined)
         return true;
      else{

     const dataStr = data.name;

     if(dataStr.indexOf(filter) == 0){
       data.visible=!data.visible;
       return data.visible;
     }else
       return data.visible;

      }
   }

    this.dataSource.filter=this.HIDE_ALL;

    });

    this.initializeWebSocketConnection();

    if(this.event!=undefined && this.event=='productrequested'){
      //Agregar Streaming to Kafka ProductRequested
      this.kafkaService.setChat(this.receiver,this.name,this.user.username,
        this.user.name,this.product,this.price,this.objectid,this.id);
    }else if(this.event!=undefined && this.event=='openconversation'){

      let conversation:UserConversation=new UserConversation();
      conversation.username=this.receiver;
      conversation.idConversation=this.id;
      conversation.name=this.name;
      conversation.objectid=this.objectid;
      this.openConversation(conversation);

    }


    this.event='connect';
    this.sendMessage();
    this.event='normal';


  }


  sendMessage(){
    let message=new Message();
    message.channel=this.channel;

    message.idconversation=this.id;
    message.receiver=this.receiver;
    message.sender=this.user.username;
    message.objectid=this.objectid;
    message.namereceiver=this.name;
    message.namesender=this.user.name;
    message.id=this.id;

    if(this.event=='connect')
      message.message='@protocol_connect';
    else if(this.event=='videocall')
       message.message='@protocol_videocall$'+this.peerId;
    else if(this.event=='answer_videocall')
       message.message='@protocol_answer_videocall$'+this.peerId;
    else if(this.event=='finish_videocall')
       message.message='@protocol_finish_videocall$';
    else if(this.event=='reject_videocall')
       message.message='@protocol_reject_videocall$';
    else{
      message.message=this.typing;
      this.currentConversation.push(message);
    }


    this.rsocketService.sendMessage(message);
    this.typing="";

  }

 openConversationMessage(message:Message){

   this.receiver=message.sender;
   this.id=message.idconversation;
   this.name=message.namesender;
   this.objectid=message.objectid;
   console.log(this.id);
   this.chatService.getConversation(this.id).subscribe(data => {this.currentConversation = data; });

 }

  openConversation(conversation:UserConversation):void{

    this.receiver=conversation.username;
    this.id=conversation.idConversation;
    this.name=conversation.name;
    this.objectid=conversation.objectid;
    this.chatService.getConversation(this.id).subscribe(data => {this.currentConversation = data; });


  }


  makeVideoCall():void{
    this.isVisible=true;
    this.startStreamingObjects();
    //alert(this.peerId);
    this.event='videocall';
    this.sendMessage();
    this.event='normal';

  }

  startStreamingObjects(){

    this.isCallStarted$ = this.callService.isCallStarted$;

    if(this.peerId=="")
    this.peerId = this.callService.initPeer();

    this.callService.localStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)

    this.callService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => {this.remoteVideo.nativeElement.srcObject = stream; this.isVisible=false;})
  }

  public processRequestVideoCall(pid:string){

    this.showModal(this.name,pid);

  }

  public processAnswerVideoCall(pid:string){

    of(this.callService.establishMediaCall(pid)).subscribe(_  => { this.videocall=true });
    of(this.callService.enableCallAnswer()).subscribe(_  => { });



  }


  private acceptedCall(pid:string){
    this.isVisible=true;
    this.startStreamingObjects();
    //alert(pid);
    of(this.callService.establishMediaCall(pid)).subscribe(_  => { this.videocall=true });
    of(this.callService.enableCallAnswer()).subscribe(_  => { });

    this.event='answer_videocall';
    this.sendMessage();
    this.event='normal';
  }


  public showModal(caller:string,pid:string): void {
    let dialogData: DialogData =({ caller: this.name});
    const dialogRef = this.dialog.open(VideocallComponent, {
      width: '350px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .subscribe(callAnswer =>
        callAnswer ? this.acceptedCall(pid) : this.rejectCall());
  }

  private endCall() {
    this.callService.destroyPeer();
    this.callService.closeMediaCall();
    this.videocall=false;
    this.peerId="";
    this.isCallStarted$=new Observable<true>();

    this.localVideo="";
    this.remoteVideo="";


  }

 public endCallbyMe(){
   this.endCall();
   this.event='finish_videocall';
   this.sendMessage();
   this.event='normal';
 }

 public rejectCall(){
   this.event='reject_videocall';
   this.sendMessage();
   this.event='normal';
 }


  ngOnDestroy(): void {

    }


    isSpinnerVisible(){
      return this.isVisible;
    }

    isGroup(index:any, item:any): boolean{
          return item.group;
        }

        groupHeaderClick(row:any) {
           row.expanded = !row.expanded;

           this.dataSource.filter = row.group;

          }

          detailsChatter(event: MouseEvent,objectid:string):void{


            const target = new ElementRef(event.currentTarget);
              const dialogConfig = new MatDialogConfig();

                let prequested:ProductRequested=new ProductRequested();
              prequested.objectid=parseInt(objectid);
              prequested.price=0;
            dialogConfig.data= { trigger: target,prequested: prequested,eventname:'DETAIL_VIEW_APPLICATIONS',showsold:false };
            const dialogRef = this.dialog.open(ProductcardComponent, dialogConfig);


          }


}
