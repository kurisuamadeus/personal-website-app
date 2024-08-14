import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/home_component/ProjectShowcase.css'
import { useGlobalState } from '../GlobalStateProvider'
import { Link, useParams } from 'react-router-dom'
import { UpdateLanguageParams } from '../../helper/LanguageDetector'
import axios from 'axios'

type ShowcaseData = {
    showcaseId: string,
    showcaseImageUrl: string,
    showcaseTitle: any,
    showcaseUrl: string
}

function ProjectShowcase() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageData, setPageData] = useState<ShowcaseData[] | null>();
    const [showcaseTitles, setShowcaseTitles] = useState([]);
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        if (!initProcess.current) {
            axios.get(`http://localhost:8080/getshowcase?lang=${lang}`)
                .then(res => {
                    if (pageData != res.data.data) {
                        console.log(res.data.data)
                        setPageData(res.data.data)
                    }
                    res.data.data.forEach((e: { showcaseTitle: { [x: string]: any } }) => {
                        console.log(e.showcaseTitle["en"])
                    });
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
        <div className='project-showcase'>
            <Carousel data-bs-theme="light">
                {pageData ? pageData.map((data) => {
                    return <Carousel.Item key={data.showcaseId} onClick={() => console.log("test")}>
                        <Link to={data.showcaseUrl} className='showcase-item'>
                            <div>
                                <div className='showcase-text'>
                                    <p>{data.showcaseTitle[String(globalState.state.lang)]}</p>
                                </div>
                                <iframe src={data.showcaseImageUrl} onClick={() => { window.location.href = data.showcaseUrl }} ></iframe>
                            </div>
                        </Link>
                    </Carousel.Item>
                }) : null}
            </Carousel>
        </div>
    )
}

export default ProjectShowcase