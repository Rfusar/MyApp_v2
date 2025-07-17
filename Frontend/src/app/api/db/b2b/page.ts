import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/mylib/apiClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // <-- ricevi il body JSON
    console.log(body)

    const res = await apiClient.post('/dbmyapp/b2b', body);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Errore insert API:', error);
    return NextResponse.json({ error: 'Errore' }, { status: 500 });
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
