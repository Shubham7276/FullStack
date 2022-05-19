import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../_class/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  api="http://localhost:3000/api/ticket";
  
  constructor(private http: HttpClient) { }

  addTicket(ticket: Ticket){
    console.log(ticket)
    return this.http.post(`${this.api}/addticket`,ticket );
  }

  getTicket() {
    return this.http.get(`${this.api}/getticket`);

  }

  updateTicket(id:number,desc:any,Date:any){
    return this.http.put(`${this.api}/${id}`, {desc,Date})
  }

  delete(id:number,DeleteDate:any,isDelete:boolean){
    return this.http.put(`${this.api}/del/${id}`, {DeleteDate,isDelete})
  }

}
