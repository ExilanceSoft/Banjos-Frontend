import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Gallery.css';

const GalleryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [galleryItem, setGalleryItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading with timeout (replace with actual data fetching)
    const timer = setTimeout(() => {
      if (location.state?.galleryItem) {
        setGalleryItem(location.state.galleryItem);
      } else {
        setError('No gallery item data available');
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.state]);

  if (loading) {
    return (
      <section id="gallery" className="gallery section">
        <div className="container text-center py-5">
        <div className="container text-center py-5">
          <div className="loading-overlay">
            <img 
              src="/pizza.gif"  // Make sure pizza.gif is in public folder
              alt="Loading gallery..." 
              className="loading-gif"
            />
            <div className="loading-text">Loading Gallery Details...</div>
          </div>
        </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="gallery section">
        <div className="container text-center py-5">
          <div className="alert alert-danger">{error}</div>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate(-1)}
          >
            Back to Gallery
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery Details</h2>
        <div>
          <span>Details for</span> <span className="description-title">{galleryItem.category}</span>
        </div>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          <div className="col-lg-12">
            <div className="gallery-item-detail">
              <img 
                src={galleryItem.image} 
                alt={galleryItem.category} 
                className="img-fluid gallery-detail-image"
              />
              <div className="gallery-detail-overlay">
                <h3>{galleryItem.category}</h3>
                {galleryItem.description && (
                  <p className="gallery-item-description">{galleryItem.description}</p>
                )}
                <button 
                  className="btn btn-outline-light gallery-back-btn"
                  onClick={() => navigate(-1)}
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryDetails;