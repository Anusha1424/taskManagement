import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request: any) {
    try {
        const body = await request.json();
        console.log(body);
        const { email, password, firstName, lastName } = body;

        const { data }: any = await axios.post(`http://localhost:9000/register`, {
            email,
            password,
            firstName,
            lastName
        });
        console.log(data)
        const { token } = data


        // create a next response
        const response = NextResponse.json({
            message: "Signed Up successfully",
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
