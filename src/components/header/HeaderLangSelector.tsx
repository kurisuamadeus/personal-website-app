import React from 'react'
import '../../styles/header/HeaderLangSelector.css'

function HeaderLangSelector() {
    return (
        <div className='header-lang-selector'>
            <select onChange={(e) => {
                console.log(e.target.value);
                window.location.href = 'https://www.google.com'
            }}>
                <option value={'en'} >EN</option>
                <option value={'jp'}>JP</option>
            </select>
        </div>
    )
}

export default HeaderLangSelector