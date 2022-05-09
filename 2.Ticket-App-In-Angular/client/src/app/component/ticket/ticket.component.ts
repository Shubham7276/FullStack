import { Component, OnInit ,ViewChild, AfterViewInit, Inject, Optional} from '@angular/core';
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
  
  
  constructor(private authService: AuthService, 
    @Optional() private dialogRef:MatDialogRef<DialogComponent>, 
    private dialog: MatDialog,
    public ticketService:TicketService,
    private toastr:ToastrService,
    private pipe:DatePipe
    ) { 
    this.authService.isloggedin=true
    this.authService.user=JSON.parse(localStorage.getItem('user')||"{}")
    this.email=authService.user.email
    this.model.CreatedDate=new Date().toLocaleDateString("fr-FR")
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    // console.log(myFormattedDate)
    
    console.log(this.model.CreatedDate)
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
        
      }
      else{
        console.log("Nulllllll")
      }
      this.dataSource= new MatTableDataSource<Ticket>(res as Ticket[])
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
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
    this.ticketService.delete(id,this.model.CreatedDate,true)
    .subscribe(res=>{
      this.toastr.error("Ticket Deleted")
      this.onClickget()
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {

    this.onClickget()
  //  console.log(this.editdata)
  
  }
  

}
