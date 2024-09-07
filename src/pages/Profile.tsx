import React, { useEffect, useRef, useState } from 'react'
import '../styles/Profile.css'
import '../styles/Content.css'
import { format } from 'react-string-format'
import axios from 'axios'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'

type ProfileStackData = {
    type: string,
    contents: {
        stackName: string,
        icon: string
    }[]
}


function Profile() {
    const globalState = useGlobalState()
    const params = useParams()
    const [stackLinkQuery, setStackLinkQuery] = useState("")
    const stackLink = 'https://www.google.com/search?q='
    const [pageData, setPageData] = useState({
        profileTitle: "",
        profileContent: "",
        programmingLanguageTitle: "",
        toolsServicesTitle: "",
        iconSearchWord: ""
    })
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
            <h1>{pageData.profileTitle}</h1>
            <p>{pageData.profileContent}</p>
            <h1>{pageData.programmingLanguageTitle}</h1>
            <div className='stacks'>
                <>
                    {
                        stackData != null ? stackData[0].contents.map((content, x) => {
                            return <a key={'PL' + x} className={content.icon} href={stackLink + format(stackLinkQuery, content.stackName)}></a>
                        }) : null
                    }
                </>
            </div>
            <h1>{pageData.toolsServicesTitle}</h1>
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