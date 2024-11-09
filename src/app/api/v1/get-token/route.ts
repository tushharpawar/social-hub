import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const token = serverClient.createToken(userId);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json({ error: 'Error generating token' }, { status: 500 });
  }
}