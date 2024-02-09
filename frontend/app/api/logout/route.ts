import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request: any) {
    try {
        // create a next response
        const response = NextResponse.json({
            success: true,
        });
        // set this token in the user cookies
        response.cookies.delete("token");
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }


}
