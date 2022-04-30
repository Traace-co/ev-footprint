
export interface Country {
  id: string
  name: string
  kgCO2PerKWh: number,
  emoji: string
}

export const allCountries: Country[] = [
  // Source for kgCO2PerKWh (unless otherwise specified):
  // ADEME (https://bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?moyenne_par_pays.htm)
  {
    id: 'eu',
    name: 'Europe',
    emoji: '🇪🇺',
    kgCO2PerKWh: 0.306 // Source: Carbone 4
  },
  {
    id: 'us',
    name: 'USA',
    emoji: '🇺🇸',
    kgCO2PerKWh: 0.522
  },
  {
    id: 'fr',
    name: 'France',
    emoji: '🇫🇷',
    kgCO2PerKWh: 0.0505 // Source: Carbone 4
  },
  {
    id: 'de',
    name: 'Germany',
    emoji: '🇩🇪',
    kgCO2PerKWh: 0.461
  },
  {
    id: 'cn',
    name: 'China',
    emoji: '🇨🇳',
    kgCO2PerKWh: 0.766
  },
  {
    id: 'in',
    name: 'India',
    emoji: '🇮🇳',
    kgCO2PerKWh: 0.912
  },
  {
    id: 'pl',
    name: 'Poland',
    emoji: '🇵🇱',
    kgCO2PerKWh: 0.781
  },
  {
    id: 'se',
    name: 'Sweden',
    emoji: '🇸🇪',
    kgCO2PerKWh: 0.03
  },
  {
    id: 'renewable',
    name: '100% Renewable',
    emoji: '🌿',
    kgCO2PerKWh: 0.018 // Source: Carbone 4
  }
]