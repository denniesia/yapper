import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../lib/db";
import User from "../../../lib/schemas/UserSchema";


export async function POST(req) {
    const { username, email, password, confirmPassword } = await req.json();
   
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!username || !email || !password || !confirmPassword) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (confirmPassword !== password) {
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }   

    try {
        await makeSureDbIsReady();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        }); 

        await newUser.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }


}