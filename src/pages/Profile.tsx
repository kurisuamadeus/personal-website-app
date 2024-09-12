import React, { useEffect, useRef, useState } from 'react'
import '../styles/Profile.css'
import '../styles/Content.css'
import { format } from 'react-string-format'
import axios from 'axios'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface ProfileStackData {
    type: string,
    contents: {
        stackName: string,
        icon: string
    }[]
}

interface ProfilePageData {
    profileTitle: string,
    profileContent: string,
    programmingLanguageTitle: string,
    toolsServicesTitle: string,
    iconSearchWord: string
    metaData: {
        title: string
        desc: string
        robot: string
        canonical: string
        enableOG: boolean
        keywords: string
    }
}


function Profile() {
    const globalState = useGlobalState()
    const params = useParams()
    const [stackLinkQuery, setStackLinkQuery] = useState("")
    const stackLink = 'https://www.google.com/search?q='
    const [pageData, setPageData] = useState<ProfilePageData | null>()
    const [stackData, setStackData] = useState<ProfileStackData[] | null>()
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=profile`)
                .then(res => {
                    console.log(res)
                    if (pageData != res.data.data.content) {
                        setPageData(res.data.data.content)
                        console.log(res.data.data.content.iconSearchWord)
                        setStackLinkQuery(res.data.data.content.iconSearchWord)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/gettoolsdata`)
                .then((res) => {
                    console.log(res)
                    if (stackData != res.data.data) {
                        setStackData(res.data.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        return () => {
            initProcess.current = true
        }
    }, [])
    return (
        <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className='profile content'>
            <Helmet htmlAttributes={{ lang: ConvertLanguageCodeToOfficialCode(String(params.lang)) }}>
                <title>{pageData?.metaData.title == "" || pageData == null ? "AmadeusDev | Profile" : pageData.metaData.title}</title>
                <meta name="description" content={pageData?.metaData.desc} />
                <meta name='keywords' content={pageData?.metaData.keywords == "" || pageData == null ? 'dev, development, game, web, personal website, unity, react' : pageData?.metaData.keywords} />
                <meta name="robots" content={pageData?.metaData.robot} />
                <link rel="canonical" href={pageData?.metaData.canonical == "" || pageData == null ? `${document.location.host}/${String(params.lang)}/profile` : pageData.metaData.canonical}></link>
                <link rel="alternate" href={document.location.href} hrefLang={ConvertLanguageCodeToOfficialCode(String(params.lang))} />
                <meta name="language" content={ConvertLanguageCodeToOfficialCode(String(params.lang))}></meta>
            </Helmet>
            <h1>{pageData?.profileTitle}</h1>
            <p>{pageData?.profileContent}</p>
            <h1>{pageData?.programmingLanguageTitle}</h1>
            <div className='stacks'>
                <>
                    {
                        stackData != null ? stackData[0].contents.map((content, x) => {
                            return <a key={'PL' + x} className={content.icon} href={stackLink + format(stackLinkQuery, content.stackName)}></a>
                        }) : null
                    }
                </>
            </div>
            <h1>{pageData?.toolsServicesTitle}</h1>
            <div className='stacks'>
                <>
                    {
                        stackData != null ? stackData[1].contents.map((content, x) => {
                            return <a key={'T' + x} className={content.icon} href={stackLink + format(stackLinkQuery, String(content.stackName))}></a>
                        }) : null
                    }
                </>
            </div>

        </div>
    )
}

export default Profile