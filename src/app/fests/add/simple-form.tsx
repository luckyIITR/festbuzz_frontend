'use client';

import React, { useState } from 'react';
import { useAddFestMutation, CreateFestRequest } from '@/hooks/fest';
import { RouteGuard } from '@/components/RouteGuard';
import StateDropdown from '../../components/StateDropdown';
import CollegeDropdown from '../../components/CollegeDropdown';
import { useCollegeList } from '@/hooks/common';

interface SimpleFormData {
  name: string;
  type: string;
  visibility: 'public' | 'private';
  state: string;
  city: string;
  venue: string;
  college: string;
  startDate: string;
  endDate: string;
  festMode: 'online' | 'offline' | 'hybrid';
  rulebook: string;
  instagram: string;
  website: string;
  about: string;
  contact: string;
  email: string;
  logo: string;
  heroImage: string;
  organizerLogo: string;
  bannerImage: string;
  galleryImages: string[];
  sponsors: {
    name: string;
    image: string;
    title: string;
  }[];
  tickets: {
    name: string;
    feeType: 'free' | 'paid';
    price?: number;
    availableFrom?: string;
    availableTill?: string;
  }[];
  status: 'draft' | 'published' | 'archived';
}

const defaultFormData: SimpleFormData = {
  name: '',
  type: 'Technical',
  visibility: 'public',
  state: '',
  city: '',
  venue: '',
  college: '',
  startDate: '',
  endDate: '',
  festMode: 'offline',
  rulebook: '',
  instagram: '',
  website: '',
  about: '',
  contact: '',
  email: '',
  logo: '',
  heroImage: '',
  organizerLogo: '',
  bannerImage: '',
  galleryImages: [],
  sponsors: [],
  tickets: [],
  status: 'draft',
};

function SimpleAddFestForm() {
  const [formData, setFormData] = useState<SimpleFormData>(defaultFormData);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [sponsors, setSponsors] = useState<{ name: string; image: string; title: string }[]>([]);
  const [tickets, setTickets] = useState<{ name: string; feeType: 'free' | 'paid'; price?: number; availableFrom?: string; availableTill?: string }[]>([]);
  
  const { mutate: addFest, isPending, error, isSuccess, reset } = useAddFestMutation();
  const colleges = useCollegeList();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.value.split(',').map(img => img.trim()).filter(img => img);
    setGalleryImages(images);
  };

  const addSponsor = () => {
    setSponsors(prev => [...prev, { name: '', image: '', title: '' }]);
  };

  const updateSponsor = (index: number, field: string, value: string) => {
    setSponsors(prev => prev.map((sponsor, i) => 
      i === index ? { ...sponsor, [field]: value } : sponsor
    ));
  };

  const removeSponsor = (index: number) => {
    setSponsors(prev => prev.filter((_, i) => i !== index));
  };

  const addTicket = () => {
    setTickets(prev => [...prev, { name: '', feeType: 'free', price: 0 }]);
  };

  const updateTicket = (index: number, field: string, value: any) => {
    setTickets(prev => prev.map((ticket, i) => 
      i === index ? { ...ticket, [field]: value } : ticket
    ));
  };

  const removeTicket = (index: number) => {
    setTickets(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: CreateFestRequest = {
      ...formData,
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      sponsors: sponsors.length > 0 ? sponsors : undefined,
      tickets: tickets.length > 0 ? tickets : undefined,
    };

    addFest(submitData);
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setGalleryImages([]);
    setSponsors([]);
    setTickets([]);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#23252B] via-[#1a1b1f] to-[#111215] px-2 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Festival Created!</h2>
            <p className="text-gray-300">Your festival has been successfully created and is now live.</p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={resetForm}
              className="bg-[#0248F7] text-[#E1FF01] font-bold px-8 py-3 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              Create Another Festival
            </button>
            <button
              onClick={() => window.location.href = '/fests'}
              className="bg-white/10 text-white font-bold px-8 py-3 rounded-full text-lg shadow-xl hover:bg-white/20 transition-all duration-300"
            >
              View All Fests
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#23252B] via-[#1a1b1f] to-[#111215] px-2 sm:px-6 py-8">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Create New Festival</h1>
        
        {error && (
          <div className="w-full mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-300 text-center">
            {error.message || 'An error occurred while creating the festival'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold text-sm mb-2">Festival Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter festival name"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Visibility *</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

                         <div>
               <label className="block text-white font-bold text-sm mb-2">Fest Mode *</label>
               <select
                 name="festMode"
                 value={formData.festMode}
                 onChange={handleInputChange}
                 required
                 className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
               >
                 <option value="offline">Offline</option>
                 <option value="online">Online</option>
                 <option value="hybrid">Hybrid</option>
               </select>
             </div>

             <div>
               <label className="block text-white font-bold text-sm mb-2">Status</label>
               <select
                 name="status"
                 value={formData.status}
                 onChange={handleInputChange}
                 className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
               >
                 <option value="draft">Draft</option>
                 <option value="published">Published</option>
                 <option value="archived">Archived</option>
               </select>
             </div>
           </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
               <label className="block text-white font-bold text-sm mb-2">State *</label>
               <StateDropdown
                 value={formData.state}
                 onChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
               />
             </div>

             <div>
               <label className="block text-white font-bold text-sm mb-2">City *</label>
               <input
                 type="text"
                 name="city"
                 value={formData.city}
                 onChange={handleInputChange}
                 required
                 className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                 placeholder="Enter city"
               />
             </div>

             <div>
               <label className="block text-white font-bold text-sm mb-2">Venue *</label>
               <input
                 type="text"
                 name="venue"
                 value={formData.venue}
                 onChange={handleInputChange}
                 required
                 className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                 placeholder="Enter venue"
               />
             </div>

             <div>
               <label className="block text-white font-bold text-sm mb-2">College *</label>
               <CollegeDropdown
                 value={formData.college}
                 onChange={(value) => setFormData(prev => ({ ...prev, college: value }))}
                 colleges={colleges}
               />
             </div>
          </div>

          {/* Date Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold text-sm mb-2">Start Date *</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">End Date *</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold text-sm mb-2">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white font-bold text-sm mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter website URL"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter Instagram handle"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Rulebook</label>
              <input
                type="url"
                name="rulebook"
                value={formData.rulebook}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter rulebook URL"
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold text-sm mb-2">Logo URL</label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter logo URL"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-2">Hero Image URL</label>
              <input
                type="url"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter hero image URL"
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-white font-bold text-sm mb-2">Gallery Images (comma-separated URLs)</label>
            <input
              type="text"
              value={galleryImages.join(', ')}
              onChange={handleGalleryImageChange}
              className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Enter image URLs separated by commas"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-white font-bold text-sm mb-2">About *</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Describe your festival"
            />
          </div>

          {/* Sponsors */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-white font-bold text-sm">Sponsors</label>
              <button
                type="button"
                onClick={addSponsor}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Sponsor
              </button>
            </div>
            {sponsors.map((sponsor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Sponsor name"
                  value={sponsor.name}
                  onChange={(e) => updateSponsor(index, 'name', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Sponsor title"
                  value={sponsor.title}
                  onChange={(e) => updateSponsor(index, 'title', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Sponsor image URL"
                  value={sponsor.image}
                  onChange={(e) => updateSponsor(index, 'image', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeSponsor(index)}
                  className="bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Tickets */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-white font-bold text-sm">Tickets</label>
              <button
                type="button"
                onClick={addTicket}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add Ticket
              </button>
            </div>
            {tickets.map((ticket, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Ticket name"
                  value={ticket.name}
                  onChange={(e) => updateTicket(index, 'name', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <select
                  value={ticket.feeType}
                  onChange={(e) => updateTicket(index, 'feeType', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
                {ticket.feeType === 'paid' && (
                  <input
                    type="number"
                    placeholder="Price"
                    value={ticket.price || ''}
                    onChange={(e) => updateTicket(index, 'price', parseFloat(e.target.value) || 0)}
                    className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  />
                )}
                <input
                  type="datetime-local"
                  placeholder="Available from"
                  value={ticket.availableFrom || ''}
                  onChange={(e) => updateTicket(index, 'availableFrom', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <input
                  type="datetime-local"
                  placeholder="Available till"
                  value={ticket.availableTill || ''}
                  onChange={(e) => updateTicket(index, 'availableTill', e.target.value)}
                  className="px-4 py-3 bg-[#252525] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeTicket(index)}
                  className="bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="bg-pink-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isPending ? 'Creating Festival...' : 'Create Festival'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SimpleAddFestPage() {
  return (
    <RouteGuard requiredPermissions={['create_fests']}>
      <SimpleAddFestForm />
    </RouteGuard>
  );
}
