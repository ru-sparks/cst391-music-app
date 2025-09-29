import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { Album } from '@/lib/types';



export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { searchTerm: string } }
) {
  const searchTerm = params.searchTerm;
  try {
    const pool = getPool();
    const albumsRes = await pool.query(
      `SELECT * FROM albums WHERE description ILIKE $1`,
      [ `%${searchTerm}%` ]
    );
    const albumsData = albumsRes.rows;
    if (albumsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const albumIds = albumsData.map(a => a.id);
    const tracksRes = await pool.query(
      'SELECT * FROM tracks WHERE album_id = ANY($1) ORDER BY number',
      [albumIds]
    );
    const tracksData = tracksRes.rows;

    const tracksByAlbum: Record<number, any[]> = {};
    for (const track of tracksData) {
      (tracksByAlbum[track.album_id] ||= []).push({
        id: track.id,
        number: track.number,
        title: track.title,
        lyrics: track.lyrics,
        video: track.video_url,
      });
    }

    const result: Album[] = albumsData.map(album => ({
      id: album.id,
      title: album.title,
      artist: album.artist,
      year: album.year,
      image: album.image,
      description: album.description,
      tracks: tracksByAlbum[album.id] || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(`GET /api/albums/search/description/${searchTerm} error:`, error);
    return NextResponse.json({ error: 'Failed to search albums by description' }, { status: 500 });
  }
}
