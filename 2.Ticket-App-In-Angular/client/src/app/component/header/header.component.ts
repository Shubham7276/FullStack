import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor(public AuthService:AuthService,public router: Router, private toastr:ToastrService) {this.AuthService.user}

  ngOnInit(): void {
    
   
  }

  
  onLogoutClick() {
    
    this.AuthService.logout();
    this.AuthService.isloggedin = false;
    this.toastr.info("Logout Successfully")
    this.router.navigate(['/signIn']);
   
  }

 
  
}
