export interface Prospect {
  name: string;
  shooting: number;
  defense: number;
  hustle: number;
  teamFit: number;
}

export interface Weights {
  shooting: number;
  defense: number;
  hustle: number;
  teamFit: number;
}

export interface RadarDataPoint {
  subject: string;
  prospect: number;
  allStar: number;
  fullMark: number;
}

export interface WeightDataPoint {
  name: string;
  value: number;
}

export interface ComparisonDataPoint {
  name: string;
  prospect: number;
  allStar: number;
}

export interface AllStarAverages {
  shooting: number;
  defense: number;
  hustle: number;
  teamFit: number;
}
