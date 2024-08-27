import React, { useEffect, useRef, useState } from 'react'
import HeaderButton from './HeaderButton'
import '../../styles/header/HeaderButtons.css'
import axios from 'axios'
import { useGlobalState } from '../GlobalStateProvider'
import { GetLanguageFromNavigator, GetLanguageFromUrlPath, UpdateLanguageParams } from '../../helper/LanguageDetector'

interface HeaderData {
    homeTitle: string,
    profileTitle: string,
    projectsTitle: string,
    contactTitle: string
}

function HeaderButtons() {
    const [lang, setLang] = useState(UpdateLanguageParams(String(GetLanguageFromUrlPath() != null ? GetLanguageFromUrlPath() : sessionStorage.getItem('lang') != null ? sessionStorage.getItem('lang') : navigator.language)))
    const [pageData, setPageData] = useState<HeaderData>();
    const initProcess = useRef(false)
    useEffect(() => {
        if (!initProcess.current) {

            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=header`)
                .then(res => {
                    if (pageData != res.data.data.content) {
                        setPageData(res.data.data.content)

                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return () => {
            initProcess.current = true
        }
    }, [])
    return (
        <div className='header-buttons'>
            <HeaderButton label={String(pageData?.homeTitle)} destUrl='/' />
            <HeaderButton label={String(pageData?.profileTitle)} destUrl={`/${lang}/profile`} />
            <HeaderButton label={String(pageData?.projectsTitle)} destUrl={`/${lang}/projects`} />
            <HeaderButton label={String(pageData?.contactTitle)} destUrl={`/${lang}/contact`} />
        </div>
    )
}

export default HeaderButtons