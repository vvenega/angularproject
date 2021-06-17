import { Component, OnInit } from '@angular/core';
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';
import { Subscription,Observable,of } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  public userName: string="";
  public user:User=new User();
  public ecommunities:string[];




  constructor(private loginService:LoginService) {
    //this.isLoggedin=this.user.valid;
    this.loginService.getLoggedInName.subscribe(name => this.changeName(name));
    this.loginService.getLoggedInEcommunities.subscribe(ecommunities=>this.changeEcommunities(ecommunities));
    this.userName="";
    this.ecommunities=[];

   }

  ngOnInit() {

    this.user=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.userName=this.user.name;
    this.ecommunities=this.user.ecommunities;
  }

  salir() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.loginService.getLoggedInName.unsubscribe();
    this.loginService.getLoggedInEcommunities.unsubscribe();

}

private changeName(name: string): void {

        this.userName = name;

    }

    private changeEcommunities(ecommunities: string[]): void {

        this.ecommunities = ecommunities;

    }
}
