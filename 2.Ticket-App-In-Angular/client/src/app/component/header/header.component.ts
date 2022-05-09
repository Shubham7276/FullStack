import { Component, OnInit } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor(public AuthService:AuthService,public router: Router) {this.AuthService.user}

  ngOnInit(): void {
    
   
  }

  
  onLogoutClick() {
    
    this.AuthService.logout();
    this.AuthService.isloggedin = false;
    this.router.navigate(['/signIn']);
   
  }

 
  
}
