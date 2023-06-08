import React from "react";

type LeaderboardProps = {
    data: any[]
}


export default function Leaderboard({ data }: LeaderboardProps) {
    return (
        <div className="leaderboard">
            <h2>Top 10</h2>
            <table>
                <thead>
                    <tr>
                        <th>Closest City</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((location, index) => {
                        return (
                            <tr key={index}>
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
