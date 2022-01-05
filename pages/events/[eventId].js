import React, { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/events/error-alert";
import { getEventById, getAllEvents } from "../../helpers/api-util";

const EventDetailPage = ({selectedEvent}) => {
  const event = selectedEvent

  console.log(event);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId

  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map(event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    fallback: false //if fallback is false, with the unknown id page will redirect to 404 page 
  }
}

export default EventDetailPage;
