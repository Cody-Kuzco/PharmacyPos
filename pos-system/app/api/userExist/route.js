// import User from "@/models/User";
// import { connect } from "@/utils/db";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connect();
//     const { username } = await req.json();
//     const user = await User.findOne({ username }).select("_id");
//     return NextResponse.json({ user });
//   } catch (error) {
//     console.log(error);
//   }
// }
