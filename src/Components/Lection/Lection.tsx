import * as React from 'react';
import lection1 from "../../images/lection1.png";

interface IProps {
    title: string;
    time: string;
    src: string;
}

export const Lection = ({title, time, src}: IProps) => {
    return (
        <div className="bg-secondary-color w-full rounded-xl shadow-card mb-8">
            <div className="p-4">
                <p className="mb-1">{title}</p>
                <p className="opacity-70">12:40 - 14:10</p>
            </div>
            <div className="h-[240px]">
                <img src={lection1} alt="Выпускной РТУ МИРЭА в режиме онлайн" className="h-full w-full rounded-xl object-cover"/>
            </div>
        </div>
    );
};