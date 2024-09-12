import React, { useEffect, useState } from 'react'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { Helmet } from 'react-helmet-async'
import { ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useParams } from 'react-router-dom'

function PageNotFound() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageMessage, setPageMessage] = useState("");
    useEffect(() => {
        const lang = UpdateLanguageParams(String(sessionStorage.getItem('lang')))
        globalState.setState({ lang: lang })
        switch (lang) {
            case "jp":
                setPageMessage("ページがありません")
                break;
            case "en":
            default:
                setPageMessage("Page Not Found")
                break;
        }
    }, [])
    return (
        <div>
            <Helmet htmlAttributes={{ lang: ConvertLanguageCodeToOfficialCode(String(params.lang)) }}>
                <title>404</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            404
            <p>{pageMessage}</p>
        </div>
    )
}

export default PageNotFound