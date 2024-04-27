import { connectToDataBase } from "@/db/database";
import { NextResponse } from "next/server";
import BDMarker from "@/models/marker";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
    }

    const { id } = params;
    const { newNote: note, newTitle: title } = await request.json();
    await connectToDataBase();
    const marker = await BDMarker.findByIdAndUpdate(id, { note, title });
    return NextResponse.json({ message: "Marker Updated.", marker: marker }, { status: 200 });
}

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
    }

    const { id } = params;
    await connectToDataBase();
    const marker = await BDMarker.findOne({ _id: id });
    return NextResponse.json({ marker }, { status: 200 });
}