import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';

import History from "@/components/history/history";
import React from 'react';
import DownloadButton from './downloadButton/downloadButton';

import style from "./historyWrapper.module.css"



type HistoryWrapperProps = {
    data: any,
    country: string,
};

export default function HistroyWrapper({ data, country }: HistoryWrapperProps) {

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

    const renderDateRangePicker = () => {
        return (
            <DateRange

                editableDateInputs={true}
                onChange={(item: any) => {
                    setTimeRange([item.selection])
                }}
                moveRangeOnFirstSelection={false}
                ranges={timeRange}


                minDate={new Date((new Date).getTime() - (28 * 24 * 60 * 60 * 1000))}
                maxDate={new Date()}
            />
        )
    }

    return (
        <div style={{ width: "100%" }}>
            <h3 style={{ fontSize: 42, marginBottom: 7 }}> Historical overview: <span style={{ color: "#EFA537" }}>{country} </span></h3>
            <div style={{ display: 'flex', gap: "2ch" }}>

                <span
                    className={style.dateRangePill}
                    onClick={() => {
                        dialog.showModal()
                    }}
                >
                    <b>From: </b>{timeRange[0].startDate.toDateString()} --&gt; <b>to: </b>{timeRange[0].endDate.toDateString()}
                </span>
            </div>

            <dialog
                ref={(e) => dialog = e!}
                className={style.dateRangePicker}>
                {renderDateRangePicker()}


                <button onClick={() => dialog.close()}
                    className={style.dateRangePickerClose}> X </button>
            </dialog>
            <div className={style.historyGrid}>

                {data.map((location: any) => <History
                    key={location.Location + ":history"}
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