'use client'
import { useParams } from 'next/navigation';

export default function FestDetailsPage() {
  // In a real app, you would fetch fest details using festId
  // For now, just show the festId
  const params = useParams();
  const festId = params?.festId;

  return (
    <main>
      <h1>Fest Details</h1>
      <p>Fest ID: {festId}</p>
      {/* Fest details will go here */}
    </main>
  );
} 