import React, { useEffect } from 'react'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'

function PageNotFound() {
    const globalState = useGlobalState()
    useEffect(() => {
        const lang = UpdateLanguageParams(String(sessionStorage.getItem('lang')))
        globalState.setState({ lang: lang })
    }, [])
    return (
        <div>404</div>
    )
}

export default PageNotFound