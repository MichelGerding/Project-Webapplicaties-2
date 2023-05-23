import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export const authOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!,
            issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER!,
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET!,

    theme: {
        colorScheme: "dark", // "auto" | "dark" | "light"
        brandColor: "#000", // Hex color code
        buttonText: "#fff" // Hex color code
    }
}

// @ts-expect-error
export default NextAuth(authOptions)