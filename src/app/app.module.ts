import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importing the Reactive Forms from Angular
import  {ReactiveFormsModule} from '@angular/forms';

// To work with http requests
import { HttpClientModule } from '@angular/common/http';

// Importing the Angular material components
  // Tables
import {MatTableModule} from '@angular/material/table';  // tables
import {MatPaginatorModule} from '@angular/material/paginator'; //paginators
  // Forms
import {MatFormFieldModule} from '@angular/material/form-field';  // Forms
import {MatInputModule} from '@angular/material/input';           // Inputs 
import {MatSelectModule} from '@angular/material/select';         // Selects
import {MatButtonModule} from '@angular/material/button';         // buttons
import {MatDatepickerModule} from '@angular/material/datepicker'; // Datepickers
import {MatNativeDateModule} from '@angular/material/core';       // Native Date
import { MomentDateModule } from '@angular/material-moment-adapter'; // Date format
  // Alerts
import {MatSnackBarModule} from '@angular/material/snack-bar';    // Notifications
  // Icons
import {MatIconModule} from '@angular/material/icon';             // Icons
  // Modals
import {MatDialogModule} from '@angular/material/dialog';         // Modal dialogs
  // Grid list
import {MatGridListModule} from '@angular/material/grid-list';    // Grid lists
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
