import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  // To connect to our API /employee
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "employee/";
  
  constructor(private http:HttpClient) { }

  // getting the list of employees
  getList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}list`)
  }

  // to add an employee
  add(model:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}save`, model);
  }

  // to update an employee
  update(idEmployee:number, model:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}update/${idEmployee}`, model);
  }

  // to delete an employee
  delete(idEmployee:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete/${idEmployee}`);
  }
}

