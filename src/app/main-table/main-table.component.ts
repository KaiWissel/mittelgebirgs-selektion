import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pilot, pilots, setAttentionMarker } from '../store';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.css',
})
export class MainTableComponent implements OnInit {
  data: Pilot[];

  ngOnInit(): void {
    this.data = pilots;
  }

  updateSelected(
    event: Event,
    key: 'moselSelected' | 'sauerlandSelected',
    pilot: Pilot
  ): void {
    // @ts-ignore
    const value = event.target.checked;
    pilot[key] = value;
    setAttentionMarker();
  }
}
