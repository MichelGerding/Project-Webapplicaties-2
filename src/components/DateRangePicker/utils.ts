import {
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	isBefore,
	addDays,
	isSameDay,
	parse,
	isValid
} from "date-fns";
import { DateRange } from "./types";

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => {
	return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
		array.slice(i * size, i * size + size)
	);
};

export const combine = (...args: any[]): string => args.filter(identity).join(" ");

// Date
export const getDaysInMonth = (date: Date) => {
	const startWeek = startOfWeek(startOfMonth(date));
	const endWeek = endOfWeek(endOfMonth(date));
	const days = [];
	for (let curr = startWeek; isBefore(curr, endWeek); ) {
		days.push(curr);
		curr = addDays(curr, 1);
	}
	return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
	(startDate && isSameDay(day, startDate)) as boolean;

export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
	(endDate && isSameDay(day, endDate)) as boolean;

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
	(startDate &&
		endDate &&
		(inRange(day, startDate, endDate) ||
			isSameDay(day, startDate) ||
			isSameDay(day, endDate))) as boolean;

export const inRange = (d:Date, s:Date, e: Date) => dates.inRange(d,s,e)

export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
	if (startDate && endDate) {
		return isSameDay(startDate, endDate);
	}
	return false;
};

type Falsy = false | null | undefined | 0 | "";

export const parseOptionalDate = (date: Date | string | Falsy, defaultValue: Date) => {
	if (date) {
		const parsed = parse(date);
		if (isValid(parsed)) return parsed;
	}
	return defaultValue;
};

export const  dates = {
    convert:function(d: Date) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a: Date,b: Date) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d: Date,start: Date,end: Date) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

