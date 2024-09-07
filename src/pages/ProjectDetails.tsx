import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../components/GlobalStateProvider'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import axios from 'axios'
import '../styles/ProjectDetails.css'
import { Helmet } from 'react-helmet-async'

interface ProjectData {
    projectId: string,
    url: string,
    thumbnailImageUrl: string,
    title: string,
    data: ProjectContentData

}
interface ProjectContentData {
    [key: string]: {
        title: string,
        desc: string
    }
}

function ProjectDetails() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageData, setPageData] = useState<ProjectData>();
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getproject/details?lang=${lang}&projectId=${params.projectId}`)
                .then(res => {
                    if (pageData != res.data.data) {
                        setPageData(res.data.data)
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
        <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className='project-details content'>
            <Helmet>
                <title>{pageData?.data[String(params.lang)].title}</title>
                <meta name='description' content={pageData?.data[String(params.lang)].desc} />
                <link rel="alternate" href={document.location.href} hrefLang={ConvertLanguageCodeToOfficialCode(String(params.lang))} />
                <meta name='keywords' content={'dev, development, project, ' + pageData?.data[String(params.lang)].title} />
            </Helmet>
            <h1>{pageData?.data[String(params.lang)].title}</h1>
            <iframe src={pageData?.thumbnailImageUrl} />
            <p>{pageData?.data[String(params.lang)].desc}</p>
            <a href={pageData?.url} target='_blank'>{params.lang == "jp" ? "リンクはこちら" : "Visit"}</a>
        </div>
    )
}

export default ProjectDetails