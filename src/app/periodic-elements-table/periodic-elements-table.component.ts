import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormsModule } from '@angular/forms';

import { PeriodicElement } from '../_models/periodicElement';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditElementDialogComponent } from './edit-element-dialog/edit-element-dialog.component';

@Component({
  selector: 'app-periodic-elements-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './periodic-elements-table.component.html',
  styleUrl: './periodic-elements-table.component.css'
})
export class PeriodicElementsTableComponent {
  private readonly debounceTimeMs = 2000;
  readonly dialog = inject(MatDialog);

  filterValue: string = '';
  filterUpdate = new Subject<string>();
  initialCount = 18;
  dataSource = new MatTableDataSource(ELEMENT_DATA.map(function (item, index) {
    return {
      Id: index + 1,
      Number: item.position,
      Name: item.name,
      Weight: item.weight,
      Symbol: item.symbol,
    };
  }));
  columns = ['Id', 'Number', 'Name', 'Weight', 'Symbol'];

  constructor() {
    this.filterUpdate.pipe(
      debounceTime(this.debounceTimeMs),
      distinctUntilChanged())
      .subscribe(value => {
        this.applyFilter(value);
      });
  }

  openDialog(row: any) {
    this.dialog.open(EditElementDialogComponent, {
      data: row
    });
  }

  dataChanged(value: any) {
    this.dataSource.data.filter(entry => entry.Id == value.id)[0].Name = value.name;
    this.dataSource.data.filter(entry => entry.Id == value.id)[0].Symbol = value.symbol;
    this.dataSource.data.filter(entry => entry.Id == value.id)[0].Number = value.position;
    this.dataSource.data.filter(entry => entry.Id == value.id)[0].Weight = value.weight;
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { id: 2, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { id: 3, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { id: 4, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { id: 5, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { id: 6, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { id: 7, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { id: 8, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { id: 9, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { id: 10, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
