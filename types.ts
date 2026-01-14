
export interface ForecastDay {
  date: string;
  snowDepth: number; // in inches
  condition: string;
  highTemp: number; // Fahrenheit
  lowTemp: number; // Fahrenheit
}

export interface ResortInfo {
  id: string;
  name: string;
  kanjiName: string;
  forecast: ForecastDay[];
  baseDepth: number; // Current total snow on ground in inches
  totalAccumulation: number; // 7-day forecasted total in inches
  distanceFromNakajima: string;
  travelTime: string;
  description: string;
  sources: { title: string; uri: string }[];
  coords: { x: number; y: number }; // Percentage coordinates for SVG map
}

export enum Resort {
  NISEKO = "Niseko United",
  RUSUTSU = "Rusutsu Resort",
  KIRORO = "Kiroro Resort",
  TEINE = "Sapporo Teine",
  FURANO = "Furano Ski Resort",
  TOMAMU = "Hoshino Resorts Tomamu",
  SAHORO = "Sahoro Resort",
  ASAHIDAKE = "Asahidake",
  KAMUI = "Kamui Ski Links"
}
