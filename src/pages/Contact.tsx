import React from 'react'
import '../styles/contact.css'
import { useForm } from 'react-hook-form'

function Contact() {
    const { register, handleSubmit } = useForm();
    return (
        <div className=' contact content'>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <div>
                    <label>Email</label>
                    <input type='email' {...register("email")} placeholder='email' />
                </div>
                <div>
                    <label>Name</label>
                    <input type='text' {...register("name")} placeholder='name' />
                </div>
                <div>
                    <label>Inquiry</label>
                    <select {...register("inquiry")}>
                        <option>test</option>
                        <option>test1</option>
                        <option>test2</option>
                        <option>test3</option>
                        <option>test4</option>
                    </select>
                </div>
                <label>Message</label>
                <textarea {...register("message")} placeholder='message' />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Contact