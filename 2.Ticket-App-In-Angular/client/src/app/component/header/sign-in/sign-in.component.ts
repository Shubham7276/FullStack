import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { LoginData } from '../_classes/login-data';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginData = new LoginData("","");
  constructor(private authService: AuthService, private router: Router,public flashMessagesService:  FlashMessagesService, private toastr: ToastrService) {
    if(this.authService.loggedIn()){
      this.router.navigateByUrl('/ticket')
    }
  }

  ngOnInit(): void {}
  onLoginSubmit() {
    const loginData = new LoginData(this.loginData.username, this.loginData.password);
    
    this.authService.authenticateUser(loginData).subscribe(res => {
      if(res.user) {
        this.authService.storeUserData(res.accessToken, res.user);
        this.authService.isloggedin = true
        this.authService.user = res.user
        // this.flashMessagesService.show('You are now logged in.', { cssClass: 'alert-success', timeout: 2500});
        this.toastr.success(this.loginData.username + " You are now logged in")
        
        this.router.navigate(['ticket']);
      }
      else {
        // this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        this.toastr.error('Something went Wrong')
        this.router.navigate(['signIn']);
      }
      
    });
  }
}
