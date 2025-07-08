'use client'
import { useParams } from 'next/navigation';

export default function EventDetailsPage() {
  // In a real app, you would fetch event details using festId and eventId
  // For now, just show the IDs
  const params = useParams();
  const festId = params?.festId;
  const eventId = params?.eventId;

  return (
    <main>
      <h1>Event Details</h1>
      <p>Fest ID: {festId}</p>
      <p>Event ID: {eventId}</p>
      {/* Event details will go here */}
    </main>
  );
} 