import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/lib/apiClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // <-- ricevi il body JSON
    console.log(body)

    const res = await apiClient.post('/dbmyapp', body);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Errore insert API:', error);
    return NextResponse.json({ error: 'Errore insert' }, { status: 500 });
  }
}

//export async function GET() {
//  try {
//
//  } catch (error) {
//    console.error('Errore insert API:', error);
//    return NextResponse.json({ error: 'Errore insert' }, { status: 500 });
//  }
//}
