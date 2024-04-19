import { connectToDataBase } from "@/db/database";
import BDMarker from "@/models/marker";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { lat, long, note } = await request.json();
    await connectToDataBase();
    await BDMarker.create({ lat, long, note });
    return NextResponse.json({ message: "Marker Created" }, { status: 201 });
}