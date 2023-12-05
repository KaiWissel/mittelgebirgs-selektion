import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { startImport } from '../store';

@Component({
  selector: 'app-import-csv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-csv.component.html',
  styleUrl: './import-csv.component.css',
})
export class ImportCsvComponent {
  importCsv() {
    document.getElementById('importCsvInput')?.click();
  }

  async onFileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];

    const content = await file.text();
    startImport(content);
  }
}
