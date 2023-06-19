import { DateRangePicker, DateRange } from "@/components/DateRangePicker/index"

import React, { useEffect } from 'react';

import History from "@/components/history/history";
import DownloadButton from './downloadButton/downloadButton';

import style from "./historyWrapper.module.css"



type HistoryWrapperProps = {
    data: any,
    country: string,
};

function useOutsideAlerter(ref: HTMLDialogElement) {
    useEffect(() => {
      function handleClickOutside(event: React.MouseEvent) {
        const rect = ref.getBoundingClientRect();
        const isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            ref.close();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside as any);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside as any);
      };
    }, [ref]);
  }

export default function HistroyWrapper({ data, country }: HistoryWrapperProps) {

    

    const [dialogElem, setDialogElem] = React.useState<any>(null as any)
    const [dialog, setDialog] = React.useState<HTMLDialogElement>(null as unknown as HTMLDialogElement);
    const outsideClick = useOutsideAlerter(dialog)
    

    const [dateRange, setDateRange] = React.useState<DateRange>(
        {
            startDate: new Date((new Date).getTime() - (28 * 24 * 60 * 60 * 1000)),
            endDate: new Date,
        }
    );

    useEffect(() => {
        if (window !== null) {
            window.onclick

        }
        
        const isMobile = window.matchMedia("(max-width: 950px)").matches

        setDialogElem(<DateRangePicker
            initialDateRange={dateRange}
            mobile={isMobile}
            open={true}
            onChange={range => setDateRange(range)}
            definedRanges={isMobile ? [] : [{
                startDate: new Date(),
                endDate: new Date(),
                label: ""
            },{
                startDate: new Date(),
                endDate: new Date(),
                label: "Today"
            },{
                startDate: new Date((new Date).getTime() - (1 * 24 * 60 * 60 * 1000)),
                endDate: new Date((new Date).getTime() - (1 * 24 * 60 * 60 * 1000)),
                label: "Yesterday"
            },{
                startDate: new Date((new Date).getTime() - (7 * 24 * 60 * 60 * 1000)),
                endDate: new Date(),
                label: "Last 7 days"
            },{
                startDate: new Date((new Date).getTime() - (14 * 24 * 60 * 60 * 1000)),
                endDate: new Date(),
                label: "Last 2 weeks"
            },{
                startDate: new Date((new Date).getTime() - (21 * 24 * 60 * 60 * 1000)),
                endDate: new Date(),
                label: "Last 3 weeks"
            },{
                startDate: new Date((new Date).getTime() - (28 * 24 * 60 * 60 * 1000)),
                endDate: new Date(),
                label: "Last 4 weeks"
            }]}
        />)
    }, [])




    let exportData = data.map((l: any) => {

        const l2 = structuredClone(l)

        l2.measurements = l2.measurements.filter((m: any) => {
            let date = new Date(m.Date);
            return (date <= dateRange.endDate!) && (date >= dateRange.startDate!)
        })

        return l2
    });

    console.log("exportData", exportData)


    const renderDateRangePicker = () => {
        if (dialogElem == null) {
            return (<></>)
        }
    
        return dialogElem
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
                    <b>From: </b>{dateRange.startDate!.toDateString()} --&gt; <b>to: </b>{dateRange.endDate!.toDateString()}
                </span>
            </div>

            <dialog
                ref={(e) => {
                    setDialog(e!);    
                }}
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
                        return (date <= dateRange.endDate!) && (date >= dateRange.startDate!)
                    }}
                />)}


            </div>
            <DownloadButton data={exportData} />


        </div>
    )
}