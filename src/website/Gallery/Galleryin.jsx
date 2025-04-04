import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://64.227.163.17:8000/gallery_cat/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch images
        const imagesResponse = await fetch('http://64.227.163.17:8000/images/images/');
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        // Set first category as active by default
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredImages = activeCategory 
    ? images.filter(img => img.category_id === activeCategory)
    : images;

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) {
    return (
      <section id="menu" className="menu section abc">
        <div className="container text-center py-5">
          <div className="loading-overlay">
            <img 
              src="/pizza.gif"
              alt="Loading ..." 
              className="loading-gif"
            />
            <div className="loading-text">Preparing Your Menu...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.gallerySection} className='abc'>
      <div style={styles.container}>
        <h2 style={styles.mainTitle}>Our Gallery</h2>
        <div style={styles.titleUnderline}></div>
        
        <h3 style={styles.checkOurGallery}>Check Our Gallery</h3>

        <div style={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category.id}
              style={activeCategory === category.id ? 
                {...styles.categoryButton, ...styles.activeCategoryButton} : 
                styles.categoryButton}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={styles.galleryGrid}>
          {filteredImages.map(image => (
            <div key={image.id} style={styles.galleryItem} onClick={() => openImageModal(image)}>
              <div style={styles.imageContainer}>
                <img 
                  src={`http://64.227.163.17:8000${image.file_path.startsWith('/') ? '' : '/'}${image.file_path}`} 
                  alt={image.name} 
                  style={styles.galleryImage}
                  loading="lazy"
                />
                <div style={styles.imageOverlay}>
                  <h3 style={styles.imageTitle}>{image.name}</h3>
                  {image.description && (
                    <p style={styles.imageDescription}>{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div style={styles.modalOverlay} onClick={closeImageModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeImageModal}>
              &times;
            </button>
            <img
              src={`http://64.227.163.17:8000${selectedImage.file_path.startsWith('/') ? '' : '/'}${selectedImage.file_path}`}
              alt={selectedImage.name}
              style={styles.modalImage}
            />
            <div style={styles.modalText}>
              <h3 style={styles.modalTitle}>{selectedImage.name}</h3>
              {selectedImage.description && (
                <p style={styles.modalDescription}>{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Styles
const styles = {
  gallerySection: {
    padding: '60px 0',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  mainTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: 'rgb(26, 24, 20)',
    marginBottom: '15px',
    position: 'relative',
    textAlign: 'center',
  },
  titleUnderline: {
    width: '80px',
    height: '3px',
    backgroundColor: '#e4141c',
    margin: '0 auto 40px',
    textAlign: 'center',
  },
  checkOurGallery: {
    fontSize: '25px',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(120deg, rgb(51, 51, 51), rgb(228, 20, 28))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    textAlign: 'center',
    margin: '20px 0'
  },
  categoryFilter: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px',
  },
  categoryButton: {
    padding: '8px 20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    '&:hover': {
      backgroundColor: '#e4141c',
      color: '#fff',
      borderColor: '#e4141c',
    },
  },
  activeCategoryButton: {
    backgroundColor: '#e4141c',
    color: '#fff',
    borderColor: '#e4141c',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  galleryItem: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '250px',
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  imageOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    color: '#fff',
    padding: '20px',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
    'div:hover &': {
      transform: 'translateY(0)',
    },
  },
  imageTitle: {
    margin: '0 0 10px',
    fontSize: '18px',
  },
  imageDescription: {
    margin: '0',
    fontSize: '14px',
    opacity: '0.8',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  modalImage: {
    width: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
  },
  modalText: {
    padding: '20px',
    textAlign: 'center',
  },
  modalTitle: {
    margin: '0 0 10px',
    fontSize: '24px',
    color: '#333',
  },
  modalDescription: {
    margin: '0',
    fontSize: '16px',
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#e4141c',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'conic-gradient(#e4141c 0%, #f3f3f3 0%)',
    animation: 'spin 1.2s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerInner: {
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    fontSize: '18px',
    color: '#333',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '500',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)', background: 'conic-gradient(#e4141c 0%, #f3f3f3 0%)' },
    '50%': { background: 'conic-gradient(#e4141c 50%, #f3f3f3 0%)' },
    '100%': { transform: 'rotate(360deg)', background: 'conic-gradient(#e4141c 100%, #f3f3f3 0%)' },
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.8 },
    '50%': { opacity: 1 },
  },
};

export default Gallery;