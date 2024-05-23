import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  //check if there is no user
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "User Found", data: user },
    { status: 200 }
  );
}
