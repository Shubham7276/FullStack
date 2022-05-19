import { Component, OnInit ,ViewChild, Optional} from '@angular/core';
import { AuthService } from '../header/_services/auth.service';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TicketService } from './_service/ticket.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Ticket } from './_class/ticket';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  displayedColumns: string[] = ['index','Uname', 'desc', 'CreatedDate','UpdateDate','DeleteDate','Editbtn','Deletebtn'];
  dataSource= new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  model = new Ticket("","","","","","",true);
  email
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd/MM/yyyy  h:mm a');
  constructor(private authService: AuthService, 
    @Optional() private dialogRef:MatDialogRef<DialogComponent>, 
    private dialog: MatDialog,
    private router: Router,
    public ticketService:TicketService,
    private toastr:ToastrService,
    private pipe:DatePipe
    ) { 
    this.authService.isloggedin=true
    this.authService.user=JSON.parse(localStorage.getItem('user')||"{}")
    this.email=authService.user.email
    
    this.model.CreatedDate=this.myFormattedDate
    
   }

   ngOnInit(): void {

    this.onClickget()
  
  }

   openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'
     }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.onClickget();
      }
    })
  }
  onClickget(){
    this.ticketService.getTicket()
    .subscribe(res=>{
      if(res){
        console.log(res)
        this.dataSource= new MatTableDataSource<Ticket>(res as Ticket[])
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
      else{
        console.log("No ticket")
      }
      
    })
    
  }


  editTicket(row:any){
    
    this.dialog.open(DialogComponent,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        
        this.onClickget();
        
      }
    })
  }

  deleteTicket(id:number){

    const confirmBox = window.confirm(
      "Are You Sure to Delete this ticket ?"
    )
    if (confirmBox === true) {
      
      this.ticketService.delete(id,this.model.CreatedDate,true)
      .subscribe(res=>{
        this.toastr.error("Ticket Deleted")
        this.onClickget()
        console.log(this.model.CreatedDate)
      })
     
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
