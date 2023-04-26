import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';

// Importing our Interface
import { Employee } from './Interfaces/employee';
import { EmployeeService } from './Services/employee.service';


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
    public dialog: MatDialog
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
}
