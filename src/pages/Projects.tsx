import React, { useEffect, useRef, useState } from 'react'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import ProjectComponent from '../components/project_component/ProjectComponent'
import axios from 'axios'
import '../styles/Projects.css'
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
        title: string
    }
}

interface ProjectsPageData {
    gameTitle: string,
    webDevTitle: string,
    metaData: {
        title: string
        desc: string
        robot: string
        canonical: string
        enableOG: boolean
        keywords: string
    }
}


function Projects() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageData, setPageData] = useState<ProjectsPageData | null>();
    const [gameProjectData, setGameProjectData] = useState<ProjectData[]>();
    const [webdevProjectData, setWebdevProjectData] = useState<ProjectData[]>();
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=projects`)
                .then(res => {
                    if (pageData != res.data.data.content) {
                        setPageData(res.data.data.content)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getproject/search?lang=${lang}&category=game`)
                .then(res => {
                    if (gameProjectData != res.data.data) {
                        setGameProjectData(res.data.data)
                        console.log(res.data.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getproject/search?lang=${lang}&category=webdev`)
                .then(res => {
                    if (webdevProjectData != res.data.data) {
                        setWebdevProjectData(res.data.data)
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
        <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className='project content'>
            <Helmet htmlAttributes={{ lang: ConvertLanguageCodeToOfficialCode(String(params.lang)) }}>
                <title>{pageData?.metaData.title == "" || pageData == null ? "AmadeusDev | Projects" : pageData.metaData.title}</title>
                <meta name="description" content={pageData?.metaData.desc} />
                <meta name='keywords' content={pageData?.metaData.keywords == "" || pageData == null ? 'dev, development, game, web, personal website, unity, react' : pageData?.metaData.keywords} />
                <meta name="robots" content={pageData?.metaData.robot} />
                <link rel="canonical" href={pageData?.metaData.canonical == "" || pageData == null ? `${document.location.host}/${String(params.lang)}/projects` : pageData.metaData.canonical}></link>
                <link rel="alternate" href={document.location.href} hrefLang={ConvertLanguageCodeToOfficialCode(String(params.lang))} />
                <meta name="language" content={ConvertLanguageCodeToOfficialCode(String(params.lang))}></meta>
            </Helmet>
            <h2>{pageData?.gameTitle}</h2>
            <div className='project-list'>
                {
                    gameProjectData ? gameProjectData.map((data) => {
                        return <ProjectComponent imgUrl={data.thumbnailImageUrl} projectId={data.projectId} projectName={data.data[String(params.lang)].title} />
                    }) : null
                }
            </div>
            <h2>{pageData?.webDevTitle}</h2>
            <div className='project-list'>
                {
                    webdevProjectData ? webdevProjectData.map((data) => {
                        return <ProjectComponent imgUrl={data.thumbnailImageUrl} projectId={data.projectId} projectName={data.data[String(params.lang)].title} />
                    }) : null
                }

            </div>
        </div>
    )
}

export default Projects