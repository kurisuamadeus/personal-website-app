import React, { useContext, useEffect, useState } from 'react'
import '../../styles/header/HeaderLangSelector.css'
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../GlobalStateProvider';



function HeaderLangSelector() {
    const [lang, setLang] = useState(sessionStorage.getItem('lang'))
    const globalState = useGlobalState();
    return (
        <div className='header-lang-selector'>
            <select onChange={(e) => {
                setLang(e.target.value)
                // console.log(e.target.value);
                // console.log(window.location.href.split('/')[3])
                let currentUrl = window.location.href.split('/')
                currentUrl[3] = e.target.value
                window.location.href = currentUrl.join('/')
            }} value={globalState.state.lang}>
                <option value={'en'}>EN</option>
                <option value={'jp'}>JP</option>
            </select>
        </div>
    )
}

export default HeaderLangSelector