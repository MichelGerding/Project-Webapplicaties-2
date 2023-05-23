import { signOut } from "next-auth/react";

import { Session, } from "next-auth";

type SessionInfoProps = {
    session: Session;
}

export default function SessionInfo({ session }: SessionInfoProps) {
    return (
        <div>
            <main>
                <h1>Logged in</h1>
                <p>
                    <strong>Status:</strong> Authorized
                </p>
                <p>
                    <strong>Session:</strong> {JSON.stringify(session, null, 2)}
                </p>

                <button onClick={() => { signOut() }}> Sign Out</button>
            </main>
        </div>
    )
}