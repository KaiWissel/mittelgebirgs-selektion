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
