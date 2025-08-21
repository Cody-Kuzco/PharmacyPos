// app/api/auth/reset-password/route.js
import User from "@/models/User";
import { connect } from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connect();

  const { email, newPassword } = await request.json();
//  resetPasswordExpire: { $gt: Date.now() },
  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return Response.json(
        { message: "Invalid or expired email" },
        { status: 400 }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return Response.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}