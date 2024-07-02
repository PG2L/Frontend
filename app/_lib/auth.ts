"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key: Uint8Array = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: any): Promise<string> {
//     return await new SignJWT(payload)
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime("10 sec from now")
//         .sign(key);
// }

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

// export async function login(formData: FormData): Promise<void> {
//     // Verify credentials && get the user
//     try {
//         const response = await fetch(`http://localhost:8000/api/login_check`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to post data');
//         }

//         // Create the session
//         const token: string = await response.json().token;
//         const expires = new Date(Date.now() + (5 * 60) * 1000); // 5 minutes
//         const session: string = await encrypt({ token, expires });
    
//         // Save the session in a cookie
//         cookies().set("session", session, { expires, httpOnly: true });

//     } catch (error) {
//         switch (error) {
//             case 401:
//                 console.error('Invalid credentials');
//                 break;
//             default:
//                 console.error('An error occurred');
//                 break;
//         }
//     }
// }

// export async function logout(): Promise<void> {
//     // Destroy the session
//     cookies().set("session", "", { expires: new Date(0) });
// }

// export async function getSession(): Promise<any> {
//     const session: string | undefined = cookies().get("session")?.value;
//     if (!session) return null;
//     return await decrypt(session);
// }

// export async function updateSession(request: NextRequest): Promise<NextResponse<unknown> | undefined> {
//     const session: string | undefined = request.cookies.get("session")?.value;
//     if (!session) return;

//     // Refresh the session so it doesn't expire
//     const parsed: any = await decrypt(session);
//     parsed.expires = new Date(Date.now() + 10 * 1000);
//     const res: NextResponse<unknown> = NextResponse.next();
//     res.cookies.set({
//         name: "session",
//         value: await encrypt(parsed),
//         httpOnly: true,
//         expires: parsed.expires,
//     });
//     return res;
// }