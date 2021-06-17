import { Component, OnInit,Inject,ElementRef } from '@angular/core';
import { LoginService } from 'src/servicios/login.service';
import {User} from 'src/modelos/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public username:string="";
  public contrasenia:string="";
  public user:User=new User();



  constructor(private loginService: LoginService,private _router:Router) {
    this.username="";
    this.contrasenia="";
    this.user=new User();
  }

  ngOnInit(): void {


  }

     enviar() {
        this.loginService.cancelChatStreaming();
        this.loginService.validateUser(this.username,this.contrasenia).subscribe(data => {

          this.user = data;

          if(this.user!=null && this.user.valid){
          this.loginService.getLoggedInName.emit('Bienvenido '+this.user.name);
          this.loginService.getLoggedInEcommunities.emit(this.user.ecommunities);
          this.loginService.saveSession(this.user);

          this._router.navigate(['/listing']);

        }else{
          this.loginService.getLoggedInName.emit("");
          alert('No se pudo Ingresar con estas credenciales.');
        }

        });





    }

}
