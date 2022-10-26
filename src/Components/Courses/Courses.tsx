import * as React from 'react';
import arrowRight from '../../images/arrow-right.png'
import {useEffect, useState} from "react";
import {COURSES_URL, getCourses} from "../../api/api";

interface ICourse {
    created_at: number;
    description: string;
    id: string;
    title: string;
}

export const Courses = () => {
    const [courses, setCourses] = useState<ICourse[]>();

    useEffect(() => {
        getCourses({
            method: 'get',
            url: COURSES_URL,
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
                    setCourses(res.data)
                }
            });
    }, [])


    return (
        <>
            <div className="w-full bg-secondary-color rounded-lg sm:rounded-xl p-4 sm:p-6 xl:p-8 text-font-color flex flex-col">
                <p className="text-xl sm:text-2xl mb-6 font-medium">Мои курсы</p>
                <div className="flex flex-col gap-6">
                    {courses ?
                        courses.map((course, i) => {
                            return (
                                <div key={i} className="flex flex-col-reverse 2xl:flex-row gap-1 sm:gap-2">
                                    <div className="flex flex-col w-full 2xl:max-w-[310px]">
                                        <p className="text-lg sm:text-xl font-medium leading-5">{courses ? courses[i].description : ''}</p>
                                        <p className="text-md sm:text-lg opacity-70">Борисов А.А. Садыков И.В.</p>
                                    </div>
                                    <div className="opacity-70 flex items-start gap-3">
                                        <img src={arrowRight} alt="arrow right" className="w-[25px] mt-[9px] hidden 2xl:block"/>
                                        <p className="font-medium text-lg sm:text-xl">{courses ? courses[i].title : ''}</p>
                                    </div>
                                </div>
                            )
                        })
                        : ''}
                    {/*<div className="flex flex-col-reverse 2xl:flex-row gap-1 sm:gap-2">*/}
                    {/*    <div className="flex flex-col w-full 2xl:max-w-[310px]">*/}
                    {/*        <p className="text-lg sm:text-xl font-medium leading-5">{courses ? courses[0].description : ''}</p>*/}
                    {/*        <p className="text-md sm:text-lg opacity-70">Борисов А.А. Садыков И.В.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="opacity-70 flex items-start gap-3">*/}
                    {/*        <img src={arrowRight} alt="arrow right" className="w-[25px] mt-[9px] hidden 2xl:block"/>*/}
                    {/*        <p className="font-medium text-lg sm:text-xl">{courses ? courses[0].title : ''}</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-col-reverse 2xl:flex-row gap-1 sm:gap-2">*/}
                    {/*    <div className="flex flex-col w-full 2xl:max-w-[310px]">*/}
                    {/*        <p className="text-lg sm:text-xl font-medium leading-5">Основы сетевой безопасности в корпоративной структуре</p>*/}
                    {/*        <p className="text-md sm:text-lg opacity-70">Борисов А.А. Садыков И.В.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="opacity-70 flex items-start gap-3">*/}
                    {/*        <img src={arrowRight} alt="arrow right" className="w-[25px] mt-[9px] hidden 2xl:block"/>*/}
                    {/*        <p className="font-medium text-lg sm:text-xl">Сетевая модель OSI</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-col-reverse 2xl:flex-row gap-1 sm:gap-2">*/}
                    {/*    <div className="flex flex-col w-full 2xl:max-w-[310px]">*/}
                    {/*        <p className="text-lg sm:text-xl font-medium leading-5">Основы сетевой безопасности в корпоративной структуре</p>*/}
                    {/*        <p className="text-md sm:text-lg opacity-70">Борисов А.А. Садыков И.В.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="opacity-70 flex items-start gap-3">*/}
                    {/*        <img src={arrowRight} alt="arrow right" className="w-[25px] mt-[9px] hidden 2xl:block"/>*/}
                    {/*        <p className="font-medium text-lg sm:text-xl">Сетевая модель OSI</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
};