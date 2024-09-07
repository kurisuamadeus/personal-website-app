import React, { useEffect, useRef, useState } from 'react'
import '../styles/Contact.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UpdateLanguageParams, ConvertLanguageCodeToOfficialCode } from '../helper/LanguageDetector';
import { useGlobalState } from '../components/GlobalStateProvider';
import { contactFormSchema, ContactFormSchemaMessages } from '../schemas/schema';
import FormValidationMessage from '../helper/FormValidationMessage';



type ContactPageData = {
    emailTitle: string,
    nameTitle: string,
    inquiryTitle: string,
    inquiryValues: {
        inquiryValue: string,
        inquiryName: string
    }[]
    messageTitle: string,
    submitButtonText: string
    formErrorMessage: ContactFormSchemaMessages
}


function Contact() {
    const globalState = useGlobalState()
    const params = useParams()
    const [pageData, setPageData] = useState<ContactPageData | null>();
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/getpagedata?lang=${lang}&dataname=contact`)
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
    const { register, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(contactFormSchema(pageData?.formErrorMessage))
    });
    return (
        <div lang={ConvertLanguageCodeToOfficialCode(String(params.lang))} className=' contact content'>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
                axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}/sendmessage`, data)
                    .then(res => {

                    })
                    .catch(err => {
                        alert(err)
                    })
            })}>
                <p>
                    {FormValidationMessage([
                        String(formState.errors.email?.message),
                        String(formState.errors.name?.message),
                        String(formState.errors.inquiry?.message),
                        String(formState.errors.message?.message)
                    ])}
                </p>
                <div>
                    <label>{pageData?.emailTitle}</label>
                    <input type='email' {...register("email")} placeholder='youremail@mail.com' />
                </div>
                <div>
                    <label>{pageData?.nameTitle}</label>
                    <input type='text' {...register("name")} placeholder={pageData?.nameTitle} />
                </div>
                <div>
                    <label>{pageData?.inquiryTitle}</label>
                    <select {...register("inquiry")}>
                        {pageData?.inquiryValues.map((value) => {
                            return <option value={value.inquiryValue}>{value.inquiryName}</option>
                        })}
                    </select>
                </div>
                <label>{pageData?.messageTitle}</label>
                <textarea {...register("message")} placeholder={pageData?.messageTitle} />
                <input type='submit' value={pageData?.submitButtonText} />
            </form>
        </div>
    )
}

export default Contact