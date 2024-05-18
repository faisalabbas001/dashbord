import connectToDB from "@/database"
import { NextResponse } from "next/server"
import User from "@/models/user";
export async function POST(req) {
    try {
        await connectToDB();
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({
                success: false,
                message: "Name and email are required"
            });
        }

        const newUser = await User.create({ name, email });
        return NextResponse.json({
            success: true,
            message: "User has been registered"
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
}