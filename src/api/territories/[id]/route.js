import { connectToDataBase } from "@/db/database";
import { NextResponse } from "next/server";
import BDMarker from "@/models/marker";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newNote: note, newTitle: title } = await request.json();
    await connectToDataBase();
    const marker = await BDMarker.findByIdAndUpdate(id, { note, title });
    return NextResponse.json({ message:"Marker Updated.", marker: marker }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDataBase();
    const marker = await BDMarker.findOne({ _id: id });
    return NextResponse.json({ marker }, { status: 200 });
}