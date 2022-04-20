import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginData } from '../_classes/login-data';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginData = new LoginData("","");
  constructor(private authService: AuthService, private router: Router,public flashMessagesService:  FlashMessagesService) {this.authService.isloggedin}

  ngOnInit(): void {}
  onLoginSubmit() {
    const loginData = new LoginData(this.loginData.username, this.loginData.password);
    
    this.authService.authenticateUser(loginData).subscribe(res => {
      if(res.succes) {
        this.authService.storeUserData(res.token, res.user);
        this.authService.isloggedin = true
        this.authService.user = res.user
        this.flashMessagesService.show('You are now logged in.', { cssClass: 'alert-success', timeout: 2500});
        this.router.navigate(['products']);
      
     
        
      }
      else {
        this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        this.router.navigate(['login']);
      }
    });
  }
}
