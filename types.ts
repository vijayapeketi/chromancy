export interface AuraResult {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  auraName: string;
  description: string;
  emoji: string;
  playlistName: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  REVEALED = 'REVEALED',
  ERROR = 'ERROR'
}
