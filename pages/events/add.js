import {parseCookies} from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function AddEventPage({token}) {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    }) 

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //Validation
        const hasEmptyFields = Object.values(values).some(
           (element) => element === '')
        
        if(hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        if(!res.ok) {
            if(res.staus === 403 || res.staus === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    return (
        <Layout title='Add New Event'>
            <Link href='/events'>
                Go Back
            </Link>
            <h1>Add Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input 
                            type="text" 
                            value={values.name} 
                            id='name' 
                            name='name' 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Performers</label>
                        <input 
                            type="text" 
                            value={values.performers} 
                            id='performers' 
                            name='performers' 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Venue</label>
                        <input 
                            type="text" 
                            value={values.venue} 
                            id='venue' 
                            name='venue' 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Address</label>
                        <input 
                            type="text" 
                            value={values.address} 
                            id='address' 
                            name='address' 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Date</label>
                        <input 
                            type="date" 
                            value={values.date} 
                            id='date' 
                            name='date' 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input 
                            type="text" 
                            value={values.time} 
                            id='time' 
                            name='time' 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event Description</label>
                    <input 
                        type="text" 
                        value={values.description} 
                        id='description' 
                        name='description' 
                        onChange={handleInputChange} 
                    />
                </div>

                <input type="submit" value="Add Event" className='btn' />
            </form>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)

    return {
        props: {
            token
        }
    }
}
