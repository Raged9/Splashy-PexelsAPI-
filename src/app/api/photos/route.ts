import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const stmt = db.prepare('SELECT * FROM photos WHERE id = ?');
      const photo = stmt.get(id);
      return NextResponse.json(photo || {});
    } else {
      const stmt = db.prepare('SELECT * FROM photos ORDER BY id DESC');
      const photos = stmt.all();
      return NextResponse.json(photos);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, photographer, description, imageUrl, width, height } = body;

    const stmt = db.prepare('INSERT INTO photos (title, photographer, description, imageUrl, width, height) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(title, photographer, description, imageUrl, width, height);

    return NextResponse.json({ id: info.lastInsertRowid, message: 'Saved' });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
        stmt.run(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting' }, { status: 500 });
    }
}