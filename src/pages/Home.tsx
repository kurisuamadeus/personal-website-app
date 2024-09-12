import React, { useEffect, useRef, useState } from 'react'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import ProjectShowcase from '../components/home_component/ProjectShowcase'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'


interface HomePageData {
  metaData: {
    title: string
    desc: string
    robot: string
    canonical: string
    enableOG: boolean
    keywords: string
  }
}


function Home() {
  const globalState = useGlobalState()
  const params = useParams()
  const [pageData, setPageData] = useState<HomePageData | null>()
  const initProcess = useRef(false)
  useEffect(() => {
    const lang = UpdateLanguageParams(params.lang)
    globalState.setState({ lang: lang })
    if (!initProcess.current) {
      axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=home`)
        .then(res => {
          if (pageData != res.data.data.content) {
            setPageData(res.data.data.content)
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
    <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className='home content'>
      <Helmet htmlAttributes={{ lang: ConvertLanguageCodeToOfficialCode(String(params.lang)) }}>
        <title>{pageData?.metaData.title == "" || pageData == null ? "AmadeusDev" : pageData.metaData.title}</title>
        <meta name="description" content={pageData?.metaData.desc} />
        <meta name='keywords' content={pageData?.metaData.keywords == "" || pageData == null ? 'dev, development, game, web, personal website, unity, react' : pageData?.metaData.keywords} />
        <meta name="robots" content={pageData?.metaData.robot} />
        <link rel="canonical" href={pageData?.metaData.canonical == "" || pageData == null ? `${document.location.host}/${String(params.lang)}/home` : pageData.metaData.canonical}></link>
        <link rel="alternate" href={document.location.href} hrefLang={ConvertLanguageCodeToOfficialCode(String(params.lang))} />
        <meta name="language" content={ConvertLanguageCodeToOfficialCode(String(params.lang))}></meta>
      </Helmet>
      <ProjectShowcase />
    </div>
  )
}

export default Home