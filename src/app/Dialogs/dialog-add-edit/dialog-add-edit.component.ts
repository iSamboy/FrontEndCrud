import { Component, OnInit } from '@angular/core';

// Adding Angular Material Resources
import {FormBuilder,FormGroup,Validators} from '@angular/forms'; // Forms
import {MatDialogRef} from '@angular/material/dialog';  // Dialogs

import {MatSnackBar} from '@angular/material/snack-bar'; // Snack Bars
import {MAT_DATE_FORMATS} from '@angular/material/core'; // Date Format
import * as moment from 'moment';

// Adding our Interfaces
import { Office } from 'src/app/Interfaces/office';
import { Employee } from 'src/app/Interfaces/employee';

// Adding our Services
import { OfficeService } from 'src/app/Services/office.service';
import { EmployeeService } from 'src/app/Services/employee.service';


// Configuring date formats
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY', 
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue:MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit {

  formEmployee: FormGroup;
  tittleAction: string= 'New';
  buttonAction: string= 'Save';
  listOffice: Office[]=[];


  constructor(
    private dialogReference: MatDialogRef<DialogAddEditComponent>,
    private fb:FormBuilder, 
    private _snackBar: MatSnackBar,
    private _officeService: OfficeService,
    private _employeeService: EmployeeService
  ) { 
    this.formEmployee=this.fb.group({
      fullName:['',Validators.required],
      idOffice: ['',Validators.required],
      salary:['',Validators.required],
      contractDate: ['',Validators.required],
    })

    this._officeService.getList().subscribe({
      next: (data)=>{
        this.listOffice = data;
      },error:(e)=>{}
    });
  }

  // To show alerts
  showAlert(msg: string, action: string) {
    this._snackBar.open(msg, action,{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration: 3000 
    });
  }

  // method to send data to the table and register employee
  addEditEmployee(){
    console.log(this.formEmployee.value)
    const model:Employee={
      idPerson: 0,
      fullName: this.formEmployee.value.fullName,
      idOffice: this.formEmployee.value.idOffice,
      salary: this.formEmployee.value.salary,
      contractDate: moment(this.formEmployee.value.contractDate).format("DD/MM/YYYY") 
    }

    this._employeeService.add(model).subscribe({
      next:(data)=>{
        this.showAlert("Created Employee", "Done");
        this.dialogReference.close("created");
      },error:(e)=>{
        this.showAlert("Could not create", "Error");
      }
    })
  }

  ngOnInit(): void {
  }

}
