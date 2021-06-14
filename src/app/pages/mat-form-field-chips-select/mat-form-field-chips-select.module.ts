import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldChipsSelectComponent } from './mat-form-field-chips-select.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MatFormFieldChipsSelectComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[MatFormFieldChipsSelectComponent]
})
export class MatFormFieldChipsSelectModule { }
