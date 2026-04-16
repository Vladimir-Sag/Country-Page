export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  population: number;
  area: number;
  region: string;
  subregion: string;
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  capital?: string;
  borders?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  continents?: string[];
  independent?: boolean;
  unMember?: boolean;
}
