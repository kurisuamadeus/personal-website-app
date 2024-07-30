import React, { useEffect, useState } from 'react'
import HeaderButtons from './HeaderButtons';
import HeaderLangSelector from './HeaderLangSelector';
import '../../styles/header/HeaderComponent.css'
import { useGlobalState } from '../GlobalStateProvider';

const logoUrl = '/logotest2.svg';

function HeaderComponent() {

    return (
        <div className='header-component'>
            <a className='logo-button' href='/'><img className='logo-button' src={logoUrl} /></a>
            <HeaderButtons />
            <HeaderLangSelector />
        </div >
    )
}

export default HeaderComponent