import { useRouter } from 'next/router'
import React from 'react'
import EventList from "../../components/events/event-list"
import EventsSearch from '../../components/events/event-search'
import { getAllEvents } from '../../helpers/api-util'

const AllEventsPage = ({events}) => {
    const router = useRouter();
    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents()

    return {
        props: {
            events
        },
        revalidate: 60
    }
}

export default AllEventsPage
