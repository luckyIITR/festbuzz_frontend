'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFestEventsByStatus, usePublishEvent, useUnpublishEvent, useArchiveEvent } from '@/hooks/useEvents';
import { Event } from '@/types/fest';
import EventCard from '@/app/components/EventCard';

const tabs = [
  { label: 'Draft', value: 'draft' as const },
  { label: 'Live', value: 'published' as const },
  { label: 'Past', value: 'archived' as const },
];

export default function EventsDashboardPage() {
  const params = useParams();
  const festId = params.festId as string;
  
  const [tab, setTab] = useState<'draft' | 'published' | 'archived'>('draft');
  
  // Get events for this fest by status
  const { data: eventsData, isLoading, error } = useFestEventsByStatus(festId, tab);
  const events = eventsData || [];

  // Mutation hooks
  const publishEvent = usePublishEvent();
  const unpublishEvent = useUnpublishEvent();
  const archiveEvent = useArchiveEvent();

  if (error) {
    return (
      <div className="min-h-screen bg-[#18191C] text-white relative p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-red-400">Error loading events: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18191C] text-white relative p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-gray-400">Manage events for this fest</p>
        {events.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {events.length} {tab} event{events.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-black rounded-full p-1 w-full max-w-xl mb-8">
        {tabs.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`flex-1 px-6 py-2 rounded-full font-semibold text-lg transition-colors ${
              tab === t.value ? 'bg-blue-600 text-white' : 'text-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-pink-400 text-lg">Loading events...</div>
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">No {tab} events</h3>
          <p className="text-center max-w-md">
            {tab === 'draft' && "You don't have any draft events yet. Create your first event to get started!"}
            {tab === 'published' && "No published events found. Publish your events to make them live!"}
            {tab === 'archived' && "No archived events found. Archived events will appear here."}
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {events.map((event: Event) => (
            <EventWithActions 
              key={event.id} 
              event={event} 
              tab={tab}
              onPublish={() => publishEvent.mutate(event.id)}
              onUnpublish={() => unpublishEvent.mutate(event.id)}
              onArchive={() => archiveEvent.mutate(event.id)}
              isPublishing={publishEvent.isPending}
              isUnpublishing={unpublishEvent.isPending}
              isArchiving={archiveEvent.isPending}
            />
          ))}
        </div>
      )}

      {/* Create Event Button */}
      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg flex items-center gap-2 z-50 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create event
      </button>
    </div>
  );
}

// Event wrapper component with action buttons
interface EventWithActionsProps {
  event: Event;
  tab: 'draft' | 'published' | 'archived';
  onPublish: () => void;
  onUnpublish: () => void;
  onArchive: () => void;
  isPublishing: boolean;
  isUnpublishing: boolean;
  isArchiving: boolean;
}

function EventWithActions({ 
  event, 
  tab, 
  onPublish, 
  onUnpublish, 
  onArchive, 
  isPublishing, 
  isUnpublishing, 
  isArchiving 
}: EventWithActionsProps) {
  return (
    <div className="relative group">
      {/* Event Card */}
      <EventCard event={event} />
      
      {/* Action Buttons Overlay */}
      <div className="absolute top-4 right-4 z-50">
        <div className="flex flex-col gap-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          {/* Draft Actions */}
          {tab === 'draft' && (
            <button
              onClick={onPublish}
              disabled={isPublishing}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              {isPublishing ? (
                <>
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Publish
                </>
              )}
            </button>
          )}

          {/* Published Actions */}
          {tab === 'published' && (
            <>
              <button
                onClick={onUnpublish}
                disabled={isUnpublishing}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              >
                {isUnpublishing ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Unpublishing...
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Unpublish
                  </>
                )}
              </button>
              <button
                onClick={onArchive}
                disabled={isArchiving}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              >
                {isArchiving ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Archiving...
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Archive
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 