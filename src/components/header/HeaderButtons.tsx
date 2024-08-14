import React, { useEffect, useRef, useState } from 'react'
import HeaderButton from './HeaderButton'
import '../../styles/header/HeaderButtons.css'
import axios from 'axios'
import { useGlobalState } from '../GlobalStateProvider'
import { GetLanguageFromNavigator, GetLanguageFromUrlPath, UpdateLanguageParams } from '../../helper/LanguageDetector'



function HeaderButtons() {
    const [lang, setLang] = useState(UpdateLanguageParams(String(GetLanguageFromUrlPath() != null ? GetLanguageFromUrlPath() : sessionStorage.getItem('lang') != null ? sessionStorage.getItem('lang') : navigator.language)))
    useEffect(() => {
        console.log(GetLanguageFromUrlPath())
    }, [lang])
    const [pageData, setPageData] = useState({
        homeTitle: "",
        profileTitle: "",
        projectsTitle: "",
        contactTitle: ""
    });
    const initProcess = useRef(false)
    useEffect(() => {
        if (!initProcess.current) {
            axios.get(`http://localhost:8080/getpagedata?lang=${lang}&dataname=header`)
                .then(res => {
                    if (pageData != res.data.data.content) {
                        setPageData(res.data.data.content)
                        console.log(pageData)
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
            <HeaderButton label={pageData.homeTitle} destUrl='/' />
            <HeaderButton label={pageData.profileTitle} destUrl={`/${lang}/profile`} />
            <HeaderButton label={pageData.projectsTitle} destUrl={`/${lang}/projects`} />
            <HeaderButton label={pageData.contactTitle} destUrl={`/${lang}/contact`} />
        </div>
    )
}

export default HeaderButtons