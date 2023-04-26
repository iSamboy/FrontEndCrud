import { Component, OnInit, Inject} from '@angular/core';

// Adding Angular Material Resources
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  // Dialogs
// Adding our interfaces
import { Employee } from 'src/app/Interfaces/employee';


@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogReference: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmployee:Employee // To receive data
  ) { }

  ngOnInit(): void {
  }

  // To verify if delete button was pressed
  confirmDelete(){
    if(this.dataEmployee){
      this.dialogReference.close("delete")
    }
  }

}
