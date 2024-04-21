import { connectToDataBase } from "@/db/database";
import { NextResponse } from "next/server";
import BDMarker from "@/models/marker";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newLat: lat, newLong: long, newNote: note, newTitle:title, newAddres:address } = await request.json();
    await connectToDataBase();
    await BDMarker.findByIdAndUpdate(id, { lat, long, note, title, address });
    return NextResponse.json({ message: "Marker updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDataBase();
    const marker = await BDMarker.findOne({ _id: id });
    return NextResponse.json({ marker }, { status: 200 });
}