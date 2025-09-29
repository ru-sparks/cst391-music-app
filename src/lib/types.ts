// src\lib\types.ts
export interface Track {
  id?: number;
  number: number;
  title: string;
  lyrics?: string | null;
  video?: string | null;
}

export interface Album {
  id?: number;
  title: string;
  artist: string;
  description?: string | null;
  year: number;
  image?: string | null;
  tracks?: Track[];
}
