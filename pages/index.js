
import Link from 'next/link'
import Layout from '@/components/Layout'
import Eventitem from '@/components/Eventitem'
import { API_URL } from '@/config/index'

export default function HomePage({events}) {
 
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <Eventitem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
            <a className='btn-secondary'>View All Events</a>
        </Link>  
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()
 
  return {
    props: {events},
    revalidate: 1
  }
}