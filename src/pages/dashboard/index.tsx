import SessionInfo from "@/components/Auth/SessionInfo";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const session = useSession();

  console.log(session)

  if (session.status !== "authenticated") {
    return (
      <h1> you are not yet logged in </h1>
    )
  }

  return (
    <>
      <SessionInfo session={{ user: session.data?.user, expires: session.data!.expires }} />
    </>

  );
}
