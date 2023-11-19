import { Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pilots } from '../store';

@Component({
  selector: 'app-list-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-number.component.html',
  styleUrl: './list-number.component.css',
})
export class ListNumberComponent implements DoCheck {
  @Input()
  title: string;
  @Input()
  key: string;

  number: number;

  ngDoCheck(): void {
    if (!this.key) {
      this.number = pilots.length;
      return;
    }

    console.log(this.key);

    // @ts-ignore
    this.number = pilots.filter((p) => p[this.key]).length;
  }
}
