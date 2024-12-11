'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

type Listing = {
  id: string;
  title: string;
  description: string;
  company: { name: string; website: string };
  application_url: string;
  source_urls: string[];
  type: string;
  close_date?: string;
  locations: string[];
  study_fields: string[];
  start_date: string;
  working_rights: string[];
};

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [studyField, setStudyField] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await axios.get('/api/listings', {
        params: { type, location, studyField, sortField, sortOrder },
      });
      setListings(data);
    };
    fetchListings();
  }, [type, location, studyField, sortField, sortOrder]);

  return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="EOI">EOI</option>
            <option value="FIRST_YEAR">First Year</option>
            <option value="INTERN">Intern</option>
            <option value="GRADUATE">Graduate</option>
          </select>

          <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded"
          >
            <option value="">All Locations</option>
            <option value="VIC">VIC</option>
            <option value="NSW">NSW</option>
            <option value="QLD">QLD</option>
            <option value="WA">WA</option>
            <option value="NT">NT</option>
            <option value="SA">SA</option>
            <option value="HYBRID">Hybrid</option>
            <option value="REMOTE">Remote</option>
            <option value="AUSTRALIA">Australia</option>
          </select>

          <select
              value={studyField}
              onChange={(e) => setStudyField(e.target.value)}
              className="border p-2 rounded"
          >
            <option value="">All Study Fields</option>
            <option value="SOFTWARE">Software</option>
            <option value="CYBERSECURITY">Cybersecurity</option>
            <option value="DATA_SCIENCE">Data Science</option>
          </select>

          <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="border p-2 rounded"
          >
            <option value="title">Title</option>
            <option value="start_date">Start Date</option>
          </select>

          <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Company</th>
            <th className="border border-gray-300 px-4 py-2">Locations</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
          </tr>
          </thead>
          <tbody>
          {listings.map((listing) => (
              <tr key={listing.id}>
                <td className="border border-gray-300 px-4 py-2">{listing.title}</td>
                <td className="border border-gray-300 px-4 py-2">{listing.company.name}</td>
                <td className="border border-gray-300 px-4 py-2">{listing.locations.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(listing.start_date).toLocaleDateString()}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Home;