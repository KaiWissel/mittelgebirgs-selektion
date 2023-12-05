import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { startExport } from '../store';

@Component({
  selector: 'app-export-csv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-csv.component.html',
  styleUrl: './export-csv.component.css',
})
export class ExportCsvComponent {
  exportCsv() {
    startExport();
  }
}
