import React, { useEffect } from 'react'
import { UpdateLanguageParams } from '../helper/LanguageDetector'
import { useGlobalState } from '../components/GlobalStateProvider'
import { useParams } from 'react-router-dom'
import ProjectShowcase from '../components/home_component/ProjectShowcase'
function Home() {
  const globalState = useGlobalState()
  const params = useParams()
  useEffect(() => {
    const lang = UpdateLanguageParams(params.lang)
    globalState.setState({ lang: lang })
  }, [])
  return (
    <div className='home content'>
      <ProjectShowcase />

    </div>
  )
}

export default Home