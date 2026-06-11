import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../lib/db";
import User from "../../../lib/schemas/UserSchema";

export async function GET(req, { params }) {
	await makeSureDbIsReady();

	const { id } = await params;

	const user = await User.findById(id);

	if (!user) {
		return Response.json({ error: "User not found" }, { status: 404 });
	}

	return Response.json(user);
}


export async function PATCH(req, { params }) {
    try {
        await makeSureDbIsReady();

        const { id } = await params;
        const body = await req.json();
        
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {
                name: body.name,
                bio: body.bio,
                location: body.location,
                image: body.image,
                banner: body.banner
            },
            { new: true }
        )

        if (!updatedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 400 }
            )
        }

        return NextResponse.json(updatedUser);
    } catch(error) {
        return NextResponse.json(
            { message : error.message },
            { status: 500 }
        )
    }
}
