import { User } from "@/database/auth.schema";
import Connection from "@/database/Connection";
import { NextResponse } from "next/server";

Connection();
export async function GET() {
  try {
    const data = await User.find({});
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await User.create(body);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
