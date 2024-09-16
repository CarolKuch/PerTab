import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormsModule } from '@angular/forms';

import { PeriodicElement } from '../_models/periodicElement';

@Component({
  selector: 'app-periodic-elements-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './periodic-elements-table.component.html',
  styleUrl: './periodic-elements-table.component.css'
})
export class PeriodicElementsTableComponent {
  private readonly debounceTimeMs = 2000;

  filterValue: string = '';
  filterUpdate = new Subject<string>();
  dataSource = new MatTableDataSource(ELEMENT_DATA.map(function (item) {
    return {
      Number: item.position,
      Name: item.name,
      Weight: item.weight,
      Symbol: item.symbol
    };
  }));
  columns = ['Number', 'Name', 'Weight', 'Symbol'];

  constructor() {
    this.filterUpdate.pipe(
      debounceTime(this.debounceTimeMs),
      distinctUntilChanged())
      .subscribe(value => {
        this.applyFilter(value);
      });
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
