import { Component, OnInit, Inject } from '@angular/core';
import { Ticket } from '../_class/ticket';
import { AuthService } from '../../header/_services/auth.service';
import { TicketService } from '../_service/ticket.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   
  model = new Ticket("","","","","","",false);
 
  
  constructor(private authService:AuthService,
              private ticketService: TicketService,
              @Inject(MAT_DIALOG_DATA) public editdata:any, 
              private toastr:ToastrService,
              private dialogRef:MatDialogRef<DialogComponent>,
              private pipe:DatePipe
              ) {
    
    
    this.model.Uname=authService.user.firstname + " " + authService.user.lastname
    this.model.Email=authService.user.email
    this.model.UpdateDate='No update'
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'dd/MM/yyyy  h:mm a');
    this.model.CreatedDate=myFormattedDate
 
    if(this.editdata?._id){
      
      this.model.desc=this.editdata.desc
    }
    
    
  }

   onTicketSubmit(){
     if(this.editdata?._id){
       this.editdata.desc===this.model.desc?
       this.toastr.error("Something went wrong")
      :this.ticketService.updateTicket(this.editdata._id,this.model.desc,this.model.CreatedDate)
      .subscribe(res=>{
        if(res){
          this.toastr.success("Update ticket successful")
          this.dialogRef.close('save')
        }
        else{
          this.toastr.error("Something went wrong")
        }
      })
     }
     else{
      if(this.model.desc===''){
        
        this.toastr.error("Enter a Description")
      }
      else{
        this.ticketService.addTicket(this.model)
      .subscribe(res=>{
        if(res){
         this.toastr.success("Add ticket successful")
         this.dialogRef.close('save')
        }
        else{
          this.toastr.error("Something went wrong")
        }
      })
      }
      
     }
    
  }

  
    
  
  ngOnInit(): void {
    
    
  }

}
