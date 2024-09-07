import React, { useEffect, useState } from 'react'
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import ProjectShowcase from '../components/home_component/ProjectShowcase'
import { Helmet } from 'react-helmet-async'
function Home() {
  const globalState = useGlobalState()
  const params = useParams()
  const [metaDesc, setMetaDesc] = useState("")
  useEffect(() => {
    const lang = UpdateLanguageParams(params.lang)
    globalState.setState({ lang: lang })
    console.log(process.env.REACT_APP_BACKEND_DOMAIN)
    setMetaDesc(params.lang == "jp" ? "個人サイト" : "Personal website")
  }, [])
  return (
    <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className='home content'>
      <Helmet>
        <title>AmadeusDev</title>
        <meta name="description" content={metaDesc} />
        <meta name='keywords' content='dev, development, game, web, personal website, unity, react' />
        <link rel="alternate" href={document.location.href} hrefLang={ConvertLanguageCodeToOfficialCode(String(params.lang))} />
      </Helmet>
      <ProjectShowcase />
    </div>
  )
}

export default Home