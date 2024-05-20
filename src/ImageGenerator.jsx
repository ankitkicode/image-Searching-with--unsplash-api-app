import React, { useState } from 'react';
import axios from 'axios';
import './ImageGenerator.css';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessKey = `ojm79PKcMk7RZq3pD6EDOznyubNkparmsplw_KcDxRc`;

  const searchImages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 3 },
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      setImages(response.data.results);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error fetching images:', err);
    }
    setLoading(false);
  };

  return (
    <div className="image-search">
      <h1>Image Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a search query"
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={searchImages} style={{ padding: '10px 20px' }}>
        {loading ? 'Searching...' : 'Search Images'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="image-results">
        {images.length > 0 && images.map((image) => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} style={{ width: '300px', height: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
