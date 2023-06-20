"use client";

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { getUserLocale } from "get-user-locale";
import moment from "moment/moment";
import { useResizeDetector } from 'react-resize-detector';
import { cp } from 'fs';

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
            if (moment(d.x, "YYYY-MM-DD HH:mm").isValid()) {
                let date = moment(d.x, "YYYY-MM-DD HH:mm");

                if (!filter(date.toDate())) {
                    return undefined;
                }

                return {
                    y: d.y,
                    x: date.locale(getUserLocale({
                        fallbackLocale: "en-GB"
                    })!).format("DD/MM HH:00")
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
            // categories: data.map((d) => d.x),
            labels: {
                format: 'dd/MM'
            }

        },
        yaxis: {
            min: minVal,
            max: maxVal,
            labels: {
                formatter: (val: number) => {
                    if (val !== null) {
                        return `${val.toPrecision(2)} ${dataType}`;
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

    const { width, ref } = useResizeDetector();



    const aspectRatio = 4 / 5;
    const chartHeight = Math.min(width ?? 500, 500) * aspectRatio;

    return (
        <div ref={ref}>
            {(typeof window !== "undefined") ?
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width={"100%"}
                    height={chartHeight}
                /> : null
            }

        </div>
    );

}
