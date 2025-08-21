import User from "@/models/User";
import { connect } from "@/utils/db";

export const fetchUser = async (req, res) => {
  try {
    await connect();
    const users = await User.find()
    console.log(users);
    return users
  } catch (error) {
    console.log(error)
    throw new Error("Unable to fetch users!")
  }
};

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await User.findByIdAndDelete(id)
    return NextResponse.json({message:"User Deleted!"}, {status:201})
  }
