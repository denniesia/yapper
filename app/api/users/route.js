import { NextResponse } from "next/server";
import User from "../../lib/schemas/UserSchema";
import { makeSureDbIsReady } from "../../lib/db";

export async function GET(req, { params }) {
    try {
        await makeSureDbIsReady();
        
        const users = await User.find().sort({createdAt: -1})

        return NextResponse.json(users, { status : 200});
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users'},
            { status: 500 },
        )
    }
}

// export async function POST(req) {
//     try {

//     }
// }