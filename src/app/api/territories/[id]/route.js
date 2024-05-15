import { connectToDataBase } from "@/db/database";
import { NextResponse } from "next/server";
import Territory from "@/models/territory";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
    }

    const { id } = params;
    const { newName: name, newNote: note, newBoundingBox: boundingBox, newPins: pins, newSize: size } = await request.json();
    await connectToDataBase();
    const territory = await Territory.findByIdAndUpdate(id, { name, note, boundingBox, pins, size });
    return NextResponse.json({ message: "Territory Updated.", territory: territory }, { status: 200 });
}

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
    }

    const { id } = params;
    await connectToDataBase();
    const territory = await Territory.findOne({ _id: id });
    return NextResponse.json({ territory }, { status: 200 });
}