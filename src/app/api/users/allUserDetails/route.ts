import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";
import { getUserDataFromJWT } from "@/helpers/getUserDataFromJWT";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getUserDataFromJWT(request);
        const loggedInUser = await User.findOne({ _id: userId });

        if (loggedInUser && loggedInUser.isAdmin) {
            const users = await User.find().select("-password");

            return NextResponse.json({
                message: "Users found",
                data: users
            });
        } else {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
