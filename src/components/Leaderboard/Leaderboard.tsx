import React from "react";

import styles from "./Leaderboard.module.css";

type LeaderboardProps = {
    data: any[];
    country: string;
}


export default function Leaderboard({ data, country }: LeaderboardProps) {
    return (
        <div className={styles.leaderboard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Top 10 humidity</h2>
                <span>{country}</span>
            </div>
            <table>
                <thead>
                    <tr className={styles.tableRow}>
                        <th>Closest City</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((location, index) => {
                        return (
                            <tr key={index} className={styles.tableRow}>
                                <td>{location.Location}</td>
                                <td>{location.measurements[0].humidity}%</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    );
}
