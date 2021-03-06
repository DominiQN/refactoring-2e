export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Play {
  name: string;
  type: "tragedy" | "comedy";
}

export interface Plays {
  [play: string]: Play;
}
