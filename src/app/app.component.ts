import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

// Importing our dialogs
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';

// Importing our Interface
import { Employee } from './Interfaces/employee';
import { EmployeeService } from './Services/employee.service';

import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['FullName', 'Office', 'Salary', 'ContractDate', 'Actions'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private _employeeService:EmployeeService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar
    ){

  }

  ngOnInit(): void {
     this.showEmployees(); 
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // To take the information from our API/Database
  showEmployees(){
    this._employeeService.getList().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e)=>{}
    })
  }
  // To add employees
  dialogNewEmployee() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result=>{
      if (result === "created"){
        this.showEmployees();
      }
    })
  }

  // To edit employees
  dialogEditEmployee(dataEmployee:Employee) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data: dataEmployee
    }).afterClosed().subscribe(result=>{
      if (result === "edited"){
        this.showEmployees();
      }
    })
  }

  showAlert(msg: string, action: string) {
    this._snackBar.open(msg, action,{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration: 3000 
    });
  }

  // To delete employees
  dialogDeleteEmployee(dataEmployee:Employee){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data: dataEmployee
    }).afterClosed().subscribe(result=>{
      if (result === "delete"){
        this._employeeService.delete(dataEmployee.idPerson).subscribe({
          next:(data)=>{
            this.showAlert("Deleted Employee","Done");
            this.showEmployees();
          },error:(e)=>{}
        })
      }
    })
  }

}
