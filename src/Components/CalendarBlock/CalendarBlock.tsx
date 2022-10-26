import * as React from 'react';
import Calendar from 'react-calendar';
import './CalendarBlock.css'
import {useEffect, useState} from "react";

export const CalendarBlock = ({callback}: any) => {
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        callback(value)
    }, [value])

    return (
        <>
            <Calendar className="w-full bg-secondary-color rounded-lg sm:rounded-xl p-2 sm:p-4 xl:p-6" onChange={onChange} value={value} />
        </>
    );
};