import React, { useEffect, useRef, useState } from 'react'
import '../styles/contact.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UpdateLanguageParams } from '../helper/LanguageDetector';
import { useGlobalState } from '../components/GlobalStateProvider';


const api = axios.create({
    baseURL: 'localhost:80/getpagedata?lang=en&pagename=contact'
})



function Contact() {
    const globalState = useGlobalState()
    const params = useParams()
    const { register, handleSubmit } = useForm();
    const [pageData, setPageData] = useState({
        emailTitle: "",
        nameTitle: "",
        inquiryTitle: "",
        messageTitle: ""
    });
    const initProcess = useRef(false)
    useEffect(() => {
        const lang = UpdateLanguageParams(params.lang)
        globalState.setState({ lang: lang })
        if (!initProcess.current) {
            axios.get(`http://localhost:8080/getpagedata?lang=${lang}&dataname=contact`)
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
    return (
        <div className=' contact content'>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <div>
                    <label>{pageData.emailTitle}</label>
                    <input type='email' {...register("email")} placeholder='youremail@mail.com' />
                </div>
                <div>
                    <label>{pageData.nameTitle}</label>
                    <input type='text' {...register("name")} placeholder={pageData.nameTitle} />
                </div>
                <div>
                    <label>{pageData.inquiryTitle}</label>
                    <select {...register("inquiry")}>
                        <option>test</option>
                        <option>test1</option>
                        <option>test2</option>
                        <option>test3</option>
                        <option>test4</option>
                    </select>
                </div>
                <label>{pageData.messageTitle}</label>
                <textarea {...register("message")} placeholder={pageData.messageTitle} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Contact