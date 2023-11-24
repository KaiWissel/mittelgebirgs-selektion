import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { read, utils } from 'xlsx';
import {
  Pilot,
  pilots,
  setAttentionMarker,
  setPreSelection,
  sortPilots,
} from '../store';

@Component({
  selector: 'app-xlsx-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xlsx-input.component.html',
  styleUrl: './xlsx-input.component.css',
})
export class XlsxInputComponent {
  @Input()
  buttonTitle: string;
  @Input()
  key: string;

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];

    const content = await file.arrayBuffer();

    parseXlsx(content, this.key);
  }
}

function parseXlsx(text: any, key: string) {
  const workbookRlp = read(text);

  const sheetEntry = utils.sheet_to_json(workbookRlp.Sheets['Sheet1']);

  sheetEntry.forEach((p: any) => {
    const civlId = p['Civl id'];
    const found = pilots.find((e) => e.civlId == civlId);
    if (found) {
      // @ts-ignore
      found[key] = true;
      return;
    }

    pilots.push(createEntry(p, key));
  });

  sortPilots();
  setPreSelection();
  setAttentionMarker();
}

function createEntry(p: any, key: string): Pilot {
  const obj = {
    firstName: p.Name,
    lastName: p.Surname,
    state: p['Administrative region (state, province...)'],
    startNumber: +p['Participant number'],
    civlId: +p['Civl id'],
    latestRanking: retrieveRanking(p),
    gender: p.Gender,
  };

  // @ts-ignore
  obj[key] = true;

  return obj;
}

function retrieveRanking(p: any) {
  const value = p['Latest ranking'];

  if (!value) return 'n/a';

  if (!isNaN(value)) {
    return +value;
  }

  const res = value.match(/\d+ \((\d+)\)/);

  if (res.length) {
    return res[1];
  }

  return 'n/a';
}
