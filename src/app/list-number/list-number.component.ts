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
  key: 'mosel' | 'sauerland';

  numberRegisteredPilots: number;
  numberSelectedPilots: number;
  numberWarningPilots: number;

  ngDoCheck(): void {
    if (!this.key) {
      this.numberRegisteredPilots = pilots.length;
      this.numberSelectedPilots = pilots.filter(
        (p) => p.moselSelected || p.sauerlandSelected
      ).length;
      this.numberWarningPilots = pilots.filter((p) => p.attention).length;
      return;
    }

    // @ts-ignore
    const selectedKey: 'moselSelected' | 'sauerlandSelected' =
      this.key + 'Selected';

    this.numberRegisteredPilots = pilots.filter((p) => p[this.key]).length;
    this.numberSelectedPilots = pilots.filter((p) => p[selectedKey]).length;
  }
}
