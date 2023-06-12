import { Moment } from "moment";
import React from "react";
import Chart from "../Chart"

type HistoryProps = {
    location: any;
    filterFunction: (x: Date) => boolean
}


export default function History({ location, filterFunction }: HistoryProps) {

    return (
        <div key={location.Location + ":header-wrapper"} style={{
            background: "#F6FCF7",
            padding: "30px 35px"
        }}>
            <h2
                key={location.Location + ":header-chart"}
                style={{ margin: "0 0 10 0" }}
            > {location.Location}</h2>
            <h3 key={location.Location + ":header-humidity-chart"}
                style={{
                    fontWeight: "normal",
                    margin: "0"
                }}> Humidity </h3>
            <Chart
                key={location.Location + ":humidity-chart"}
                chartName="Humidity"
                data={location.measurements.map((d: any) => {
                    return {
                        x: d.Date,
                        y: d.humidity
                    }
                })}
                xType="date"
                yType="%"

                dataFilter={filterFunction}
            />

            <h3
                key={location.Location + ":header-visibility-chart"}
                style={{
                    fontWeight: "normal",
                    margin: "0"
                }}> Visibility </h3>
            <Chart
                key={location.Location + ":visibility-chart"}
                chartName="Visibility"
                data={location.measurements.map((d: any) => {
                    return {
                        x: d.Date,
                        y: d.visib
                    }
                })}
                xType="date"
                yType="km"
                dataFilter={(d: any) => {
                    // if (d.y < ) 
                    return true
                }}
            />
        </div>
    )
}