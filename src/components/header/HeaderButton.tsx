import React from 'react'
import '../../styles/header/HeaderButtons.css'

type HeaderButtonProps = {
    label: string
    destUrl: string
}

function HeaderButton({ label, destUrl }: HeaderButtonProps) {
    return (
        <a className='header-button' href={destUrl}>{label}</a>
    )
}

export default HeaderButton