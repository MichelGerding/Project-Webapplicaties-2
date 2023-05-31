import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function LoginScreen() {
    return (
        <div>
            <div style={{
                borderRadius: "50px",
                backgroundColor: "#ffffff",
                boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
                padding: "20px 40px",
                maxWidth: "380px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>

                <h2> You need to be logged in to use the application</h2>
                <img src="/logo.jpg" alt="logo" style={{
                    maxWidth: "300px",
                    aspectRatio: "3/2",
                }} />

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2em"
                }}>
                    <button
                        type="button"
                        onClick={() => signIn('cognito', { callbackUrl: "/dashboard" })}
                        style={{
                            backgroundColor: 'white',
                            border: '0px',
                            color: 'black',
                            borderRadius: '20px',
                            fontSize: '1.5em',
                            padding: '20px 60px',
                            boxShadow: "10px 10px 20px #666666, -10px -10px 20px #ffffff",
                            fontWeight: 'bold',
                        }}
                    >Log in</button>
                </div>
            </div>
        </div >
    )
}