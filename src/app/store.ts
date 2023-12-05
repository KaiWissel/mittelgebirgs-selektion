import { stringify } from 'csv-stringify/browser/esm';
import { parse } from 'csv-parse/browser/esm';

export type Pilot = {
  firstName: any;
  lastName: any;
  state: any;
  startNumber: number;
  civlId: number;
  latestRanking: any;
  gender: string;
  mosel?: boolean;
  sauerland?: boolean;
  moselSelected?: boolean;
  sauerlandSelected?: boolean;
  attention?: boolean;
};

export const pilots: Pilot[] = [];

export function setPreSelection() {
  const moselMaxNumber = 85;
  const sauerlandMaxNumber = 100;

  let moselAlreadySelected = 0;
  let sauerlandAlreadySelected = 0;

  for (let index = 0; index < pilots.length; index++) {
    const pilot = pilots[index];

    if (pilot.mosel && moselAlreadySelected < moselMaxNumber) {
      pilot.moselSelected = true;
      moselAlreadySelected++;
    }

    if (pilot.sauerland && sauerlandAlreadySelected < sauerlandMaxNumber) {
      pilot.sauerlandSelected = true;
      sauerlandAlreadySelected++;
    }

    if (
      pilot.sauerland &&
      pilot.mosel &&
      !(pilot.sauerlandSelected && pilot.moselSelected)
    ) {
      pilot.attention = true;
    }
  }
}

export function setAttentionMarker() {
  pilots.forEach((pilot) => {
    if (
      pilot.sauerland &&
      pilot.mosel &&
      !(pilot.sauerlandSelected && pilot.moselSelected)
    ) {
      pilot.attention = true;
    } else {
      pilot.attention = false;
    }
  });
}

export function sortPilots() {
  pilots.sort(sortByWprsRanking);
}

function sortByWprsRanking(a: Pilot, b: Pilot) {
  const aR = a.latestRanking;
  const bR = b.latestRanking;
  if (isNaN(aR) && isNaN(bR)) return 0;
  if (isNaN(aR)) return 1;
  if (isNaN(bR)) return -1;

  return aR - bR;
}

export function startExport() {
  stringify(pilots, { header: true }, (err, data) => {
    if (err) {
      console.log(err);
    }

    // Erzeuge einen Blob aus dem Text
    const blob = new Blob([data], { type: 'text/plain' });
    const date = new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
      .format(new Date())
      .replace(', ', '_')
      .replace(':', '')
      .replace('.', '');

    // Erzeuge einen Download-Link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = date + '_mittelgebirgs-selection.csv';

    // Füge den Link zum Dokument hinzu, aber halte ihn unsichtbar
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    // Klicke auf den Link, um den Download auszulösen
    downloadLink.click();
  });
}

export function startImport(content: string) {
  parse(
    content,
    {
      columns: true,
    },
    (err, data) => {
      if (err) {
        console.info(err);
      }

      pilots.splice(0, pilots.length);
      pilots.push(...data);

      console.log(data);
    }
  );
}
