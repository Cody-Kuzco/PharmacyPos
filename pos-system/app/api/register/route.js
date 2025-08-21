import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { ObjectId } from "mongodb";
import { connect } from "@/utils/db";

export async function POST(request, res) {
  
  try {
    const { username, password, phone, email, bio, userType } =
     await request.json();
    const hashPassword = await bcrypt.hash(password, 10);

    await connect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists!" }, { status: 201 });

    }
    await User.create({
      username,
      email,
      phone,
      bio,
      userType,
      password: hashPassword,
    });
    // var newUser = new User({
    //   username,
    //   email,
    //   phone,
    //   bio,
    //   userType,
    //   password: hashPassword,
    // });
  
    // var usercreated = await newUser.save();

    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while registering the user!" },
      {
        status: 500,
      }
    );
  }
}
export const fetchUserById = async (id) => {
  try {
    await connect();
    const user = User.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.log(error);
  }
};
