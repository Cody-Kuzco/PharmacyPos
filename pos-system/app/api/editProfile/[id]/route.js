import User from "@/models/User";
import { connect } from "@/utils/db";
// import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newUsername: username,
    newEmail: email,
    newPhone: phone,
    newBio: bio,
  } = await request.json();
  await connect();
  await User.findByIdAndUpdate(id, { username, email, phone, bio });
  return NextResponse.json({ message: "User updated " }, { status: 200 });
}
