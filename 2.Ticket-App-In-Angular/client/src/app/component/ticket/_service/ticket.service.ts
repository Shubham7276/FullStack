import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../_class/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  addTicket(ticket: Ticket){
    console.log(ticket)
    return this.http.post("http://localhost:3000/api/ticket/addticket",ticket );
  }

  getTicket() {
    return this.http.get("http://localhost:3000/api/ticket/getticket");

  }

  updateTicket(id:number,desc:any,Date:any){
    return this.http.put(`http://localhost:3000/api/ticket/${id}`, {desc,Date})
  }

  delete(id:number,DeleteDate:any,isDelete:boolean){
    return this.http.put(`http://localhost:3000/api/ticket/del/${id}`, {DeleteDate,isDelete})
  }

}
