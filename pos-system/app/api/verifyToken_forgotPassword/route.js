// app/api/auth/verify-reset-token/route.js
import User from "@/models/User";
import { connect } from "@/utils/db";

export async function GET(request) {
  await connect();

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ message: "Token is required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return Response.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}