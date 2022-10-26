import * as React from 'react';
import account from "../../images/account.png"
import board from "../../images/board.png"
import help from "../../images/help.png"
import settings from "../../images/settings.png"
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dashboard} from "../Dashboard/Dashboard";
import {Account} from "../Account/Account";

export const MainPage = () => {
    const [currentPage, setCurrentPage] = useState<string>("/dashboard")
    let location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);


    return (
        <div className="w-full min-h-full h-fit bg-primary-color text-font-color flex justify-between items-stretch">
            <div className="min-w-[50px] sm:min-w-[200px] bg-secondary-color flex flex-col px-2 sm:px-4 items-center">
                <div className="flex flex-col mt-12">
                    <p className="text-xl mb-6 hidden sm:block">Меню</p>
                    <div className="flex flex-col gap-4">
                        <Link className={`px-2 sm:px-4 py-2 w-fit ${currentPage === "/dashboard" ? "bg-blue-color" : 'opacity-70'} rounded-lg flex gap-3 items-center`} to={"/dashboard"}>
                            <img src={board} alt="dashboard" className="w-[15px] sm:w-[19px]"/> <p className="hidden sm:block">Dashboard</p>
                        </Link>
                        <Link className={`px-2 sm:px-4 py-2 w-fit ${currentPage === "/account" ? "bg-blue-color" : 'opacity-70'} rounded-lg flex gap-3 items-center`} to={"/account"}>
                            <img src={account} alt="Account" className="w-[15px] sm:w-[19px]"/> <p className="hidden sm:block">Профиль</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col mt-12">
                    <p className="text-xl mb-6 hidden sm:block">Помощь</p>
                    <div className="flex flex-col gap-4">
                        <Link className={`px-2 sm:px-4 py-2 w-fit ${currentPage === "/help" ? "bg-blue-color" : 'opacity-70'} rounded-lg flex gap-3 items-center`} to={"/help"}>
                            <img src={help} alt="help" className="w-[15px] sm:w-[19px]"/> <p className="hidden sm:block">Поддержка</p>
                        </Link>
                        <Link className={`px-2 sm:px-4 py-2 w-fit ${currentPage === "/settings" ? "bg-blue-color" : 'opacity-70'} rounded-lg flex gap-3 items-center`} to={"/settings"}>
                            <img src={settings} alt="settings" className="w-[15px] sm:w-[19px]"/> <p className="hidden sm:block">Настройки</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-full h-fit p-4 md:p-6 xl:p-8">
                {currentPage === "/dashboard" ?
                    <>
                        <Dashboard />
                    </>
                    :
                    ''}
                {currentPage === "/account" ?
                    <>
                        <Account />
                    </>
                    :
                    ''}
            </div>
        </div>
    );
};