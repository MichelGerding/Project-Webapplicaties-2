import Image from "next/image";
import React from "react";
import Chart from "../Chart"

type HistoryProps = {
    location: any;
    filterFunction: (x: Date) => boolean
}


export default function History({ location, filterFunction }: HistoryProps) {

    const [colapsed, setColapsed] = React.useState(true)

    const renderData = () => {
        if (colapsed) {
            return (

                <div key={location.Location + ":header-wrapper"} style={{
                    background: "#F6FCF7",
                    padding: "30px 35px"
                }}>
                    <div style={{ margin: "0 0 10 0", display: "flex", justifyContent: "space-between" }}>
                        <h2
                            key={location.Location + ":header-chart"}
                            style={{}}
                        > {location.Location}</h2>
                        <span onClick={() => {
                            setColapsed(!colapsed);
                        }}>  <Image style={{ marginTop: "10px", cursor: "pointer" }} src="caret.svg" alt="" width={40} height={40}/> </span>

                    </div>

                    <div>
                        <p style={{ margin: 0 }}> <b>Latest Humidity:</b> {location.measurements[0].humidity}%</p>
                        <p style={{ margin: 0 }}> <b>Latest Visibility:</b> {location.measurements[0].visib}km</p>
                    </div>


                </div>
            )
        } else {
            return (
                <div key={location.Location + ":header-wrapper"} style={{
                    background: "#F6FCF7",
                    padding: "30px 35px"
                }}>
                    <div style={{ margin: "0 0 10 0", display: "flex", justifyContent: "space-between" }}>
                        <h2
                            key={location.Location + ":header-chart"}
                            style={{}}
                        > {location.Location}</h2>
                        <span onClick={() => {
                            setColapsed(!colapsed);
                        }}>  <Image style={{ marginTop: "10px", rotate: "180deg" }} src="caret.svg" alt="" width={40} height={40} /> </span>

                    </div>
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
                        dataFilter={filterFunction}
                    />
                </div>
            )
        }
    }

    return (
        <>
            {renderData()}
        </>
    )
}