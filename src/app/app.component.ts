import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { XlsxInputComponent } from './xlsx-input/xlsx-input.component';
import { ListNumberComponent } from './list-number/list-number.component';
import { Pilot, pilots } from './store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    XlsxInputComponent,
    ListNumberComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = '🌄 Mittelgebirgs-Pokal-Selektion 🏆';

  data: Pilot[];

  ngOnInit(): void {
    this.data = pilots;
  }
}
