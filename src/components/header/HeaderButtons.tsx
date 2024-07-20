import React from 'react'
import HeaderButton from './HeaderButton'
import '../../styles/header/HeaderButtons.css'


function HeaderButtons() {
    return (
        <div className='header-buttons'>
            <HeaderButton label='Home' destUrl='/' />
            <HeaderButton label='Profile' destUrl='profile' />
            <HeaderButton label='Projects' destUrl='projects' />
            <HeaderButton label='Contact' destUrl='contact' />
        </div>
    )
}

export default HeaderButtons