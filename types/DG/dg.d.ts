export interface Marker {
  addTo (map: unknown): Marker;
  bindPopup(popup: unknown): void;
  removeFrom (map: unknown): void;
  openPopup(): void;
  _latlng: {
    lat: string;
    lng: string;
  };
}

export interface DoubleGis {
  map(block: HTMLElement | null, options: unknown): Map;
  marker(coords: string[], options: unknown): Marker;
  icon(options: unknown): void;
}

export interface Map {
  setView(coords: string[], zoom: number): void;
}
