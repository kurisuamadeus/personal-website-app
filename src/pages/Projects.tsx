import React, { useEffect, useRef, useState } from 'react'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import ProjectComponent from '../components/project_component/ProjectComponent'
import axios from 'axios'
import '../styles/Projects.css'

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


function Projects() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageData, setPageData] = useState({
        emailTitle: "",
        nameTitle: "",
        inquiryTitle: "",
        messageTitle: ""
    });
    const [gameProjectData, setGameProjectData] = useState<ProjectData[]>();
    const [webdevProjectData, setWebdevProjectData] = useState<ProjectData[]>();
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=project`)
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
            <h2>Game</h2>
            <div className='project-list'>
                {
                    gameProjectData ? gameProjectData.map((data) => {
                        return <ProjectComponent imgUrl={data.thumbnailImageUrl} projectId={data.projectId} projectName={data.data[String(params.lang)].title} />
                    }) : null
                }
            </div>
            <h2>Web Development</h2>
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