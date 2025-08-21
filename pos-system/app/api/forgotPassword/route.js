import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    
    // Test if database connection works
    const testUser = await User.findOne({});
    if (!testUser) {
      console.log('No users in database');
    }

    return NextResponse.json(
      { message: 'Successfully connected to database' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}