
// app\api\albums\[slug]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { Album, Track } from '@/lib/types';


export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: artistName } = await context.params;
  console
  try {
    const pool = getPool();
    const albumsRes = await pool.query(
      'SELECT * FROM albums WHERE LOWER(artist) = LOWER($1)',
      [artistName]
    );
    const albumsData = albumsRes.rows;
    if (albumsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const albumIds = albumsData.map(a => a.albumId);
    const tracksRes = await pool.query(
      'SELECT * FROM tracks WHERE album_id = ANY($1) ORDER BY number',
      [albumIds]
    );
    const tracksData = tracksRes.rows;

    const tracksByAlbum: Record<number, Track[]> = {};
    for (const track of tracksData) {
      (tracksByAlbum[track.album_id!] ||= []).push({
        albumId: track.albumId,
        number: track.number,
        title: track.title,
        lyrics: track.lyrics,
        video: track.video_url,
      });
    }

    const result: Album[] = albumsData.map(album => ({
      albumId: album.albumId,
      title: album.title,
      artist: album.artist,
      year: album.year,
      image: album.image,
      description: album.description,
      tracks: tracksByAlbum[album.albumId!] || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(`GET /api/albums/${artistName} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch albums by artist' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const albumId = parseInt(slug, 10);
  if (isNaN(albumId)) {
    return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
  }
  try {
    const pool = getPool();
    const del = await pool.query('DELETE FROM albums WHERE albumId = $1 RETURNING albumId', [albumId]);
    if (del.rowCount === 0) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ message: `Album ${albumId} deleted` });
  } catch (error) {
    console.error(`DELETE /api/albums/${albumId} error:`, error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}
