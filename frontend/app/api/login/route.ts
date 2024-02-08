import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request: any) {
    try {
        const body = await request.json();
        console.log(body);
        const { email, password } = body;

        const { data }: any = await axios.post(`http://localhost:9000/login`, {
            email,
            password
        });
        console.log(data)
        const { token } = data


        // create a next response
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });
        // set this token in the user cookies
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
