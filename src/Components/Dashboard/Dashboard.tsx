import * as React from 'react';
import lection1 from "../../images/lection1.png"
import arrowDown from "../../images/arrow-down.png"
import {useCallback, useEffect, useState} from "react";

import {CalendarBlock} from "../CalendarBlock/CalendarBlock";
import {Courses} from "../Courses/Courses";
import {getLectures, LECTURES_URL} from "../../api/api";

export const Dashboard = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [lections, setLections] = useState();
    const date = new Date();
    const monthNames = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ]

    const onOpen = () => {
        setOpen(open => !open)
    }

    const calendarCollback = useCallback((date: Date) => {
        setCurrentDate(date)
    }, [currentDate])

    useEffect(() => {
        let lectureDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
        console.log(lectureDate)
        getLectures({
            method: 'post',
            url: LECTURES_URL,
            data: {
                lecture_date: lectureDate,
            },
        })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
            .then(res => {
                if(res) {
                    console.log(res)
                    setLections(res.data)
                }
            });
    }, [])

    return (
        <>
            {open ?
                <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6 xl:gap-8">
                    <div className="lg:min-w-[420px] xl:min-w-[550px] 2xl:min-w-[700px] bg-secondary-color rounded-lg sm:rounded-xl text-font-color p-4 sm:p-6 xl:p-8">
                        <p className="font-medium text-xl sm:text-2xl mb-6">{date.toDateString() === currentDate.toDateString() ? "Сегодня" : "Выбрано"} {currentDate.getDate()} {monthNames[currentDate.getMonth()]}</p>
                        <div className="bg-secondary-color w-full rounded-lg sm:rounded-xl shadow-card mb-4 sm:mb-6 lg:md-8">
                            <div className="p-3 sm:p-4">
                                <p className="text-md sm:text-lg lg:text-xl mb-1">Выпускной РТУ МИРЭА в режиме онлайн</p>
                                <p className="opacity-70">12:40 - 14:10</p>
                            </div>
                            <div className="lg:h-[200px] xl:h-[240px] 2xl:h-[300px]">
                                <img src={lection1} alt="Выпускной РТУ МИРЭА в режиме онлайн" className="h-full w-full rounded-lg sm:rounded-xl object-cover opacity-90"/>
                            </div>
                        </div>
                        <div className="bg-secondary-color w-full rounded-lg sm:rounded-xl shadow-card mb-4 sm:mb-6 lg:md-8">
                            <div className="p-3 sm:p-4">
                                <p className="text-md sm:text-lg lg:text-xl mb-1">Выпускной РТУ МИРЭА в режиме онлайн</p>
                                <p className="opacity-70">12:40 - 14:10</p>
                            </div>
                            <div className="lg:h-[200px] xl:h-[240px] 2xl:h-[300px]">
                                <img src={lection1} alt="Выпускной РТУ МИРЭА в режиме онлайн" className="h-full w-full rounded-lg sm:rounded-xl object-cover opacity-90"/>
                            </div>
                        </div>
                        <div className="bg-secondary-color w-full rounded-lg sm:rounded-xl shadow-card mb-4 sm:mb-6 lg:md-8">
                            <div className="p-3 sm:p-4">
                                <p className="text-md sm:text-lg lg:text-xl mb-1">Выпускной РТУ МИРЭА в режиме онлайн</p>
                                <p className="opacity-70">12:40 - 14:10</p>
                            </div>
                            <div className="lg:h-[200px] xl:h-[240px] 2xl:h-[300px]">
                                <img src={lection1} alt="Выпускной РТУ МИРЭА в режиме онлайн" className="h-full w-full rounded-lg sm:rounded-xl object-cover opacity-90"/>
                            </div>
                        </div>
                        <img onClick={onOpen} src={arrowDown} alt="arrow down" className={`${open ? "rotate-180" : ""} w-10 mx-auto mt-6 opacity-70 cursor-pointer`}/>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-col gap-4 md:gap-6 xl:gap-8">
                        <CalendarBlock callback={calendarCollback} />
                        <Courses/>
                    </div>
                </div>
            :
                <div className="flex flex-col-reverse lg:flex-col gap-4 md:gap-6 xl:gap-8">
                    <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6 xl:gap-8">
                        <div className="lg:min-w-[420px] xl:min-w-[550px] 2xl:min-w-[700px] bg-secondary-color rounded-lg sm:rounded-xl text-font-color p-4 sm:p-6 xl:p-8">
                            <p className="font-medium text-xl sm:text-2xl mb-6">{date.toDateString() === currentDate.toDateString() ? "Сегодня" : "Выбрано"} {currentDate.getDate()} {monthNames[currentDate.getMonth()]}</p>
                            <div className="bg-secondary-color w-full rounded-lg sm:rounded-xl shadow-card">
                                <div className="p-3 sm:p-4">
                                    <p className="text-md sm:text-lg lg:text-xl mb-1">Выпускной РТУ МИРЭА в режиме онлайн</p>
                                    <p className="opacity-70">12:40 - 14:10</p>
                                </div>
                                <div className="lg:h-[200px] xl:h-[240px] 2xl:h-[300px]">
                                    <img src={lection1} alt="Выпускной РТУ МИРЭА в режиме онлайн" className="h-full w-full rounded-lg sm:rounded-xl object-cover opacity-90"/>
                                </div>
                            </div>
                            <img onClick={onOpen} src={arrowDown} alt="arrow down" className={`${open ? "rotate-180" : ""} w-8 sm:w-10 mx-auto mt-4 sm:mt-6 opacity-70 cursor-pointer`}/>
                        </div>
                        <CalendarBlock callback={calendarCollback} />
                    </div>
                    <Courses/>
                </div>
            }
        </>

    );
};
