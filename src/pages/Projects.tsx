import React, { useEffect } from 'react'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'

function Projects() {
    const globalState = useGlobalState()
    const params = useParams()
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
    }, [])
    return (
        <div>
            project
        </div>
    )
}

export default Projects