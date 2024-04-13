import { NextResponse } from 'next/server';
import { conn } from '../../libs/mysql';

export async function GET() {
  const result = await conn.query('SELECT NOW()');
  console.log('hello API result ::: ', result);
  return NextResponse.json({ message: result[0]['NOW()'] });
}
