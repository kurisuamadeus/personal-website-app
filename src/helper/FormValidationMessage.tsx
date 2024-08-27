import React from 'react'

type FormValidationMessageProps = {
    messages: string[]
}

function FormValidationMessage(messages: string[]): string {

    let result = ''
    messages.reverse().some((message) => {
        if (message != 'undefined') {
            result = "＊" + message
            return
        }
    })
    return result
}

export default FormValidationMessage