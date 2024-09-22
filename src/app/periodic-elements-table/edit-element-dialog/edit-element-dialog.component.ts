import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PeriodicElement } from '../../_models/periodicElement';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule, MatFormField, MatLabel, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.css'
})
export class EditElementDialogComponent {
  myForm: FormGroup;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {
    this.myForm = this.fb.group({
      Id: [data["Id" as keyof typeof data], Validators.required],
      Number: [data["Number" as keyof typeof data], Validators.required],
      Name: [data["Name" as keyof typeof data], Validators.required],
      Weight: [data["Weight" as keyof typeof data], Validators.required],
      Symbol: [data["Symbol" as keyof typeof data], Validators.required],
    });
  }

  onSubmit(): void {
    let element: PeriodicElement = {
      id: this.myForm.value.id,
      position: this.myForm.value.position,
      name: this.myForm.value.name,
      weight: this.myForm.value.weight,
      symbol: this.myForm.value.symbol
    }
    this.myForm.value;
    this.submitClicked.emit("HAHA");
  }

}
