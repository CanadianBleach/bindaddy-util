import { v4 as uuidv4 } from 'uuid';
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectToDataBase } from '@/db/database';
import BDMarker from '@/models/marker';

export async function POST(request) {
    const { lat, long, note, title, address } = await request.json();
    await connectToDataBase();
    await BDMarker.create({ lat, long, note, title, address });
    return NextResponse.json({ message: "Marker Created" }, { status: 201 });
}

export async function GET() {
    await connectToDataBase();
    const markers = await BDMarker.find();
    return NextResponse.json({ markers });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDataBase();
    await BDMarker.findByIdAndDelete(id);
    return NextResponse.json({ message: "Marker deleted" }, { status: 200 });
}