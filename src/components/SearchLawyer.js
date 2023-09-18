

import React, { useState } from 'react';
  const data = [
    {
      "_id": { "$oid": "6506f11f3d0b555071b84d65" },
      "ID": { "$oid": "6506e93a93e6020c49f5f98f" },
      "uid": "23",
      "name": "abc",
      "phone_no": { "$numberDouble": "9193894923.0" },
      "title": "advocate",
      "position": "Document Writing",
      "description": {
        "experience": {
          "year": { "$numberInt": "21" },
          "winning": { "$numberInt": "323" },
          "total_case": { "$numberInt": "34" }
        },
        "about": ["23"],
        "achievements": ["34"]
      },
      "avilable": true,
      "tag": ["Intellectual Property"],
      "address": "djsadj",
      "T_rating": "0",
      "review": [],
      "points": [],
      "createdAt": { "$date": { "$numberLong": "1694953759988" } },
      "updatedAt": { "$date": { "$numberLong": "1694953759988" } },
      "__v": { "$numberInt": "0" },
      "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1694953601/eejt4xb4r4zbzjlhiira.jpg" 
    },
    {
      "_id": { "$oid": "6506f11f3d0b555071b84d65" },
      "ID": { "$oid": "6506e93a93e6020c49f5f98f" },
      "uid": "23",
      "name": "abc",
      "phone_no": { "$numberDouble": "9193894923.0" },
      "title": "advocate",
      "position": "court cases",
      "description": {
        "experience": {
          "year": { "$numberInt": "21" },
          "winning": { "$numberInt": "323" },
          "total_case": { "$numberInt": "34" }
        },
        "about": ["23"],
        "achievements": ["34"]
      },
      "avilable": true,
      "tag": ["Intellectual Property"],
      "address": "djsadj",
      "T_rating": "10",
      "review": [],
      "points": [],
      "createdAt": { "$date": { "$numberLong": "1694953759988" } },
      "updatedAt": { "$date": { "$numberLong": "1694953759988" } },
      "__v": { "$numberInt": "0" },
      "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1694953601/eejt4xb4r4zbzjlhiira.jpg" // Updated the property name to "photo"
    },
];

function SearchLawyer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    rating: '',
    reviews: '',
  });
  const [sortBy, setSortBy] = useState(''); 

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredLawyers = data
    .filter((lawyer) => {
      const queryWords = searchQuery.toLowerCase().split(' ');

      return (
        queryWords.every((word) =>
          Object.values(lawyer).some(
            (value) =>
              typeof value === 'string' && value.toLowerCase().includes(word)
          )
        ) &&
        (!filters.experience || lawyer.description?.experience?.year?.$numberInt >= filters.experience) &&
        (!filters.rating || lawyer.T_rating >= filters.rating) &&
        (!filters.reviews || lawyer.review?.length >= filters.reviews)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'experience') {
        // Sort by experience first
        const experienceDiff =
          (b.description?.experience?.year?.$numberInt || 0) -
          (a.description?.experience?.year?.$numberInt || 0);
  
        // If experience is the same, sort by rating
        if (experienceDiff === 0) {
          return (b.T_rating || 0) - (a.T_rating || 0);
        }
  
        return experienceDiff;
      } else if (sortBy === 'rating') {
        // Sort by rating first
        const ratingDiff = (b.T_rating || 0) - (a.T_rating || 0);
  
        // If rating is the same, sort by experience
        if (ratingDiff === 0) {
          return (
            (b.description?.experience?.year?.$numberInt || 0) -
            (a.description?.experience?.year?.$numberInt || 0)
          );
        }
  
        return ratingDiff;
      }

      return 0;
    });

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center"></h1>
        <div className="flex space-x-4 justify-center">
          <input
            type="text"
            placeholder="Search here"
            className="p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Sort By.</option>
            <option value="experience">Experience</option>
            <option value="rating">Rating</option>
         
          </select>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLawyers.map((lawyer, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center"
          >
            {lawyer.photo && (
              <img
                src={lawyer.photo}
                alt={`${lawyer.name}'s Photo`}
                className="w-20 h-20 rounded-full mb-2"
              />
            )}
            <div className="text-center">
              <h2 className="text-lg font-semibold">{lawyer.name || 'No Name'}</h2>
              <p className="text-gray-600">{lawyer.title || 'No title'}</p>
              <p className="text-gray-600">{lawyer.position || 'No Position'}</p>
              <p className="text-gray-600">{lawyer.city || 'No City'}</p>
              <p className="text-gray-600">Hourly Rate: ${lawyer.hourlyRate || 'N/A'}</p>
              <p className="text-gray-600">{lawyer.T_rating || 'No title'}</p>
              <div className="mt-2">
                Tags: {lawyer.tag ? lawyer.tag.join(', ') : 'No Tags'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLawyer;

