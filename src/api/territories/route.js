import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectToDataBase } from '@/db/database';
import BDMarker from '@/models/marker';

export async function POST(request) {
    const { lat, long, note, title, address, firstName, lastName, email, active } = await request.json();
    await connectToDataBase();

    // If existing customer
    const prevMarker = await BDMarker.findOne({ email: email });
    if (prevMarker) {
        return NextResponse.json({ message: "Existing Marker Found" }, { status: 208 });
        // TODO: UPDATE MARKER?
    }

    await BDMarker.create({ lat, long, note, title, address, firstName, lastName, email, active });
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