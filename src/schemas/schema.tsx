import { format } from "react-string-format"
import * as yup from "yup"

export type ContactFormSchemaMessages = {
    noEmail: string,
    emailNotValid: string,
    noName: string,
    noInquiry: string,
    noMessage: string,
    messageTooShort: string

}

export function contactFormSchema(errorMessage: ContactFormSchemaMessages | undefined) {
    const minMessageLength = 20
    return yup.object().shape({
        email: yup.string().email(errorMessage?.emailNotValid).required(errorMessage?.noEmail),
        name: yup.string().required(errorMessage?.noName),
        inquiry: yup.string().required(errorMessage?.noInquiry),
        message: yup.string().min(minMessageLength, format(String(errorMessage?.messageTooShort), minMessageLength)).required(errorMessage?.noMessage)
    })
} 