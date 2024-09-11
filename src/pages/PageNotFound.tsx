import React, { useEffect } from 'react'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { Helmet } from 'react-helmet-async'

function PageNotFound() {
    const globalState = useGlobalState()
    useEffect(() => {
        const lang = UpdateLanguageParams(String(sessionStorage.getItem('lang')))
        globalState.setState({ lang: lang })
    }, [])
    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            404
        </div>
    )
}

export default PageNotFound