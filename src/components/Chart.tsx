"use client";

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getUserLocale } from "get-user-locale";
import moment from "moment/moment";

type ChartProps = {
    data: Data[];
    xType: string;
    yType: string;

    chartName: string;

    dataFilter: (x: Date) => boolean;
}

type Data = {
    [key: string]: number | string | undefined;

    x: string;
    y: number;
}


function parseData(dataIn: Data[], labelType: string, filter: any): Data[] {
    let correctedData = dataIn.map((d, i) => {
        // check if k is a valid date
        if (labelType === "date") {
            if (moment(d.x, "YYYY-MM-DDTHH:mm").isValid()) {
                let date = moment(d.x, "YYYY-MM-DDTHH:mm").toDate();
                if (!filter(date)) {
                    return undefined;
                }

                return {
                    y: d.y,
                    x: date.toLocaleString(
                        getUserLocale({ fallbackLocale: "en-US", useFallbackLocale: true }) as string,
                        {
                            month: "long",
                            day: "numeric",
                        }
                    )
                };
            }

            return d;
        }
    });

    return correctedData.filter(d => d !== undefined) as Data[];
}

function generateOptions(data: any[], annotations: any, dataType: string, chartId: string) {

    let minVal = Math.max(0, (Math.min(...data.map((d) => d.y)) - 5));
    let maxVal = Math.max(...data.map((d) => d.y)) + 5;

    if (dataType === "%") {
        maxVal = maxVal > 100 ? 100 : maxVal;
        minVal = minVal < 0 ? 0 : minVal;
    }


    return {
        chart: {
            id: chartId,
        },

        zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: true
        },
        xaxis: {
            categories: data.map((d) => d.x),
        },
        yaxis: {
            min: minVal,
            max: maxVal,
            labels: {
                formatter: (val: number) => {
                    if (val !== null) {
                        return `${val}${dataType}`;
                    }
                    return "N/A";
                }
            }
        },
        annotations: annotations,
        stroke: {
            width: 2
        },
        markers: {
            size: 5,
        }
    }

}

export default function CChart({
    data: dataIn,
    xType,
    yType,
    chartName,
    dataFilter
}: ChartProps) {

    const data = parseData(dataIn, xType, dataFilter);

    const avgY = data.reduce((a, b) => a + b.y, 0) / data.length;

    const annotations = {
        yaxis: [{
            y: avgY,
            borderColor: '#00E396',
            borderWidth: 4,
            label: {
                borderColor: '#00E396',
                style: {
                    color: '#fff',
                    background: '#00E396'
                },
                text: `average: ${avgY.toFixed(2)}${yType}`
            }
        }]
    }


    const options = generateOptions(
        dataIn, annotations, yType, chartName)

    // reset the shown labels when the data changes
    // the onld ones are for different data then we currently have loaded


    const series = [{
        name: chartName,
        type: "line",
        data: data,
    }] as ApexAxisChartSeries;


    return (
        <div>
            {(typeof window !== "undefined") ?
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width={500}
                    height={300}
                /> : null
            }

        </div>
    );

}
