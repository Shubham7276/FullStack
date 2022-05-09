import { Component, OnInit, Inject } from '@angular/core';
import { Ticket } from '../_class/ticket';
import { AuthService } from '../../header/_services/auth.service';
import { TicketService } from '../_service/ticket.service';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

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
              private fromBuilder:FormBuilder,
              private dialogRef:MatDialogRef<DialogComponent>
              ) {
    
    
    this.model.Uname=authService.user.firstname + " " + authService.user.lastname
    this.model.Email=authService.user.email
    this.model.UpdateDate='No update'
    this.model.CreatedDate=new Date().toLocaleDateString("fr-FR")
    
    
    if(this.editdata?._id){
      console.log(this.editdata._id)
      console.log(this.editdata.desc)
      this.model.desc=this.editdata.desc
    }
    
    
  }

   onTicketSubmit(){
     if(this.editdata?._id){
       this.editdata.desc===this.model.desc?
       alert("ticket not update")
      :this.ticketService.updateTicket(this.editdata._id,this.model.desc,this.model.CreatedDate)
      .subscribe(res=>{
        if(res){
          alert("update ticket")
          this.dialogRef.close('save')
        }
        else{
          alert('Not')
        }
      })
     }
     else{
      if(this.model.desc===''){
        this.dialogRef.close('save')
      }
      else{
        this.ticketService.addTicket(this.model)
      .subscribe(res=>{
        if(res.ticket){
         alert("ticketadd")
         this.dialogRef.close('save')
        }
        else{
          alert("not add")
        }
      })
      }
      
     }
    
  }

  
    
  
  ngOnInit(): void {
    
    
  }

}
