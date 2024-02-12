import { getUserDataFromJWT } from "@/helpers/getUserDataFromJWT";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getUserDataFromJWT(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}