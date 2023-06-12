import Link from "next/link";
import Image from "next/image";
import React from "react";

import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";

interface LinkProp {
    name: string,
    path: string
}

export interface NavbarProps {
    logo: string;
    links: LinkProp[];
}



export default function Navbar({ links }: NavbarProps) {
    const session = useSession();

    return (
        <nav className={styles.nav}>
            <div className={styles.div}>
                <Link
                    href={"/dashboard"}>
                    <Image
                        alt=""
                        width={164}
                        height={95}
                        src="/logo.jpg" />
                </Link>
                <div className={styles.profile}>
                    <span>{session.data!.user!.name}</span>
                    <img
                        className={styles.profilePic}
                        width={60}
                        height={60}
                        src={session.data!.user!.image!}
                        alt="" />
                </div>
            </div>
        </nav>
    )
}