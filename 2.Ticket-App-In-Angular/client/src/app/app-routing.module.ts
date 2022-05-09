import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './component/header/sign-in/sign-in.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { AuthGuardService } from './component/header/_services/auth-guard.service';


const routes: Routes = [
  // {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'', component: SignInComponent},

  {path:'ticket', component: TicketComponent,canActivate:[AuthGuardService]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
