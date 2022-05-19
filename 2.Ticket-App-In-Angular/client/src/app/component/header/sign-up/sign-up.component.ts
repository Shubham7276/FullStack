import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model = new User("", "", "", "","");

  constructor(private userService: UserService,private router: Router, private toastr: ToastrService) { 
  }

    onRegisterSubmit() {
      this.userService
      .registerUser(this.model)
      .subscribe(res => {
        if(res.user) {
          this.toastr.success("User registered successfully")
          this.router.navigate(['/signIn']);
        }
        else {
          this.toastr.error("User email already exist")
          this.router.navigate(['/signUp']);
        }
      });
    }

  ngOnInit(): void {
  }

}
