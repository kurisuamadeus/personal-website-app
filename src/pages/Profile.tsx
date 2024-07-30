import React, { useEffect, useRef, useState } from 'react'
import '../styles/profile.css'
import '../styles/content.css'
import { format } from 'react-string-format'
import axios from 'axios'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'


function Profile() {
    const globalState = useGlobalState()
    const params = useParams()
    let stackLinkQuery = ''
    const stackLink = 'https://www.google.com/search?q='
    const [pageData, setPageData] = useState({
        profileTitle: "",
        profileContent: "",
        programmingLanguageTitle: "",
        toolsServicesTitle: "",
        iconSearchWord: ""
    })
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`http://localhost:8080/getpagedata?lang=${lang}&dataname=profile`)
                .then(res => {
                    console.log(res)
                    if (pageData != res.data.data.content) {
                        setPageData(res.data.data.content)
                        stackLinkQuery = res.data.data.iconSearchWord
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
    // const stackInitProcess = useRef(false)
    // const [stackData, setStackData] = useState();
    // useEffect(() => {
    //     if (!stackInitProcess.current) {
    //         axios.get(`http://localhost:8080/getpagedata?lang=${lang}&dataname=profile`)
    //             .then(res => {
    //                 console.log(res)
    //                 if (pageData != res.data.data.content) {
    //                     setPageData(res.data.data.content)
    //                     stackLinkQuery = res.data.data.iconSearchWord
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    //     return () => {
    //         stackInitProcess.current = true
    //     }
    // }, [stackData])
    return (
        <div className='profile content'>
            <h1>{pageData.profileTitle}</h1>
            <p>{pageData.profileContent}</p>
            <h1>{pageData.programmingLanguageTitle}</h1>
            <div className='stacks'>
                <a className="devicon-html5-plain colored" href={stackLink + format(stackLinkQuery, 'html')}></a>
                <a className="devicon-css3-plain colored" href={stackLink + format(stackLinkQuery, 'css')}></a>
                <a className="devicon-javascript-plain colored" href={stackLink + format(stackLinkQuery, 'javascript')}></a>
                <a className="devicon-csharp-plain" href={stackLink + 'csharp'}></a>
                <a className="devicon-go-original-wordmark colored" href={stackLink + format(stackLinkQuery, 'golang')}></a>
                <a className="devicon-python-plain colored" href={stackLink + format(stackLinkQuery, 'python')}></a>
                <a className="devicon-java-plain-wordmark colored" href={stackLink + format(stackLinkQuery, 'java programming language')}></a>
            </div>
            <h1>{pageData.toolsServicesTitle}</h1>
            <div className='stacks'>
                <a className="devicon-unity-plain" href={stackLink + format(stackLinkQuery, 'unity engine')}></a>
                <a className="devicon-react-original colored" href={stackLink + format(stackLinkQuery, 'react.js')}></a>
                <a className="devicon-nextjs-plain" href={stackLink + format(stackLinkQuery, 'next.js')}></a>
                <a className="devicon-nodejs-plain-wordmark" href={stackLink + format(stackLinkQuery, 'node.js')}></a>
                <a className="devicon-express-original-wordmark" href={stackLink + format(stackLinkQuery, 'express.js')}></a>
                <a className="devicon-microsoftsqlserver-plain-wordmark" href={stackLink + format(stackLinkQuery, 'sql server')}></a>
                <a className="devicon-mysql-plain-wordmark" href={stackLink + format(stackLinkQuery, 'mysql')}></a>
                <a className="devicon-mongodb-plain-wordmark colored" href={stackLink + format(stackLinkQuery, 'mongodb')}></a>
                <a className="devicon-docker-plain colored" href={stackLink + format(stackLinkQuery, 'docker')}></a>
                <a className="devicon-kubernetes-plain colored" href={stackLink + format(stackLinkQuery, 'kubernetes')}></a>
                <a className="devicon-bootstrap-plain colored" href={stackLink + format(stackLinkQuery, 'bootstrap framework')}></a>
                <a className="devicon-photonengine-plain" href={stackLink + format(stackLinkQuery, 'photon engine')}></a>
                <a className="devicon-amazonwebservices-plain-wordmark colored" href={stackLink + format(stackLinkQuery, 'aws')}></a>
            </div>

            <div className='test'></div>
        </div>
    )
}

export default Profile