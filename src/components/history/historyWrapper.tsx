import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import History from "@/components/history/history";
import React from 'react';
import DownloadButton from './downloadButton/downloadButton';



type HistoryWrapperProps = {
    data: any,
    country: string,
};

export default function ({ data, country }: HistoryWrapperProps) {

    const [timeRange, setTimeRange] = React.useState([
        {
            startDate: new Date((new Date).getTime() - (28 * 24 * 60 * 60 * 1000)),
            endDate: new Date,
            key: 'selection'
        }
    ]);

    let dialog = null as unknown as HTMLDialogElement;


    let exportData = data.map((l: any) => {

        const l2 = structuredClone(l)

        l2.measurements = l2.measurements.filter((m: any) => {
            let date = new Date(m.Date);
            return (date <= timeRange[0].endDate) && (date >= timeRange[0].startDate)
        })

        return l2
    });

    console.log("exportData", exportData)

    return (
        <div style={{ width: "100%" }}>
            <h3 style={{ fontSize: 42, marginBottom: 7 }}> Historical overview: <span style={{ color: "#EFA537" }}>{country} </span></h3>
            <div style={{ display: 'flex', gap: "2ch" }}>

                <span onClick={() => {
                    dialog.showModal()
                }}
                    style={{
                        margin: 0,
                        padding: "7px 14px",
                        background: "#02418B",
                        color: "white",
                        borderRadius: "calc(0.5em + 7px)",
                        width: "fit-content",
                        fontWeight: "normal",
                        fontSize: "16px",
                    }}>
                    <b>From: </b>{timeRange[0].startDate.toDateString()} --&gt; <b>to: </b>{timeRange[0].endDate.toDateString()}
                </span>
            </div>

            <dialog
                ref={(e) => dialog = e!}
                style={{
                    zIndex: 100000,
                    background: "white",
                    padding: "3em"
                }}>

                <DateRangePicker

                    editableDateInputs={true}
                    onChange={(item: any) => {
                        setTimeRange([item.selection])
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={timeRange}


                    minDate={new Date((new Date).getTime() - (28 * 24 * 60 * 60 * 1000))}
                    maxDate={new Date()}
                />

                <button onClick={() => dialog.close()}
                    style={{
                        background: "none",
                        border: "none",
                        position: "absolute",
                        top: "0.5em",
                        right: "0.5em",

                        fontSize: "1.25em"


                    }}> X </button>
            </dialog>
            <div style={{
                marginTop: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, calc(600px))",
                gridGap: "60px",
                width: "100%",
                marginBottom: "60px"
            }}>

                {data.map((location: any) => <History
                    location={location}
                    filterFunction={(date) => {
                        return (date <= timeRange[0].endDate) && (date >= timeRange[0].startDate)
                    }}
                />)}


            </div>
            <DownloadButton data={exportData} />


        </div>
    )
}