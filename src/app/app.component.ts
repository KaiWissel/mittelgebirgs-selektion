import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { XlsxInputComponent } from './xlsx-input/xlsx-input.component';
import { ListNumberComponent } from './list-number/list-number.component';
import { MainTableComponent } from './main-table/main-table.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    XlsxInputComponent,
    ListNumberComponent,
    MainTableComponent,
    ExportCsvComponent,
    ImportCsvComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '🌄 Mittelgebirgs-Pokal-Selektion 🏆';
}
