import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectToDataBase } from '@/db/database';
import Territory from '@/models/territory';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    /*     const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
        } */

    const { name, note, boundingBox, pins, size } = await request.json();
    await connectToDataBase();

    // If existing customer
    const prevTerritory = await Territory.findOne({ name: name });
    if (prevTerritory) {
        return NextResponse.json({ message: "There is a territory with that name." }, { status: 208 });
    }

    await Territory.create({ name, note, boundingBox, pins, size });
    return NextResponse.json({ message: "Territory Created" }, { status: 201 });
}

export async function GET() {
    /*     const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
        } */

    await connectToDataBase();
    const territories = await Territory.find();
    return NextResponse.json({ territories });
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Access Restricted" }, { status: 403 });
    }

    const id = request.nextUrl.searchParams.get("id");
    await connectToDataBase();
    await Territory.findByIdAndDelete(id);
    return NextResponse.json({ message: "Marker deleted" }, { status: 200 });
}