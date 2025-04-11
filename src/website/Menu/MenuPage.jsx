import React, { useState, useEffect } from 'react';

const MenuPage = () => {
  const BASE_URL = "http://64.227.163.17:8000";
  const [activeTab, setActiveTab] = useState('');
  const [categories, setCategories] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both categories and all menu items in parallel
        const [categoriesResponse, menuResponse] = await Promise.all([
          fetch(`${BASE_URL}/categories/`),
          fetch(`${BASE_URL}/menu`)
        ]);

        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        if (!menuResponse.ok) throw new Error('Failed to fetch menu items');

        const categoriesData = await categoriesResponse.json();
        const menuData = await menuResponse.json();

        setCategories(categoriesData);
        setAllMenuItems(menuData);
        
        // Set default active tab to first category if available
        if (categoriesData.length > 0) {
          setActiveTab(categoriesData[0].name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter menu items when active tab changes
  useEffect(() => {
    if (activeTab && allMenuItems.length > 0) {
      const filtered = allMenuItems.filter(item => item.category_name === activeTab);
      setFilteredItems(filtered);
    }
  }, [activeTab, allMenuItems]);

  const openImageLightbox = (imageUrl) => {
    console.log('Opening lightbox for image:', imageUrl);
    // Implement lightbox functionality here
  };

  if (error) {
    return (
      <section id="menu " style={styles.menuSection} >
        <div style={styles.errorContainer}>
          <div style={styles.alert}>Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" style={styles.menuSection} className='abc'>
      <div className="container" style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Menu</h2>
          <p style={styles.sectionSubtitle}>
            Check Our <span style={styles.highlight}>Yummy Menu</span>
          </p>
        </div>

        {categories.length > 0 && (
          <ul className="nav nav-tabs d-flex justify-content-center" style={styles.navTabs}>
            {categories.map(category => (
              <li className="nav-item" key={category.id} style={styles.navItem}>
                <button
                  className={`nav-link ${activeTab === category.name ? 'active' : ''}`}
                  style={activeTab === category.name ? 
                    {...styles.navLink, ...styles.activeNavLink} : 
                    styles.navLink}
                  onClick={() => setActiveTab(category.name)}
                >
                  {/* <div style={styles.categoryImageContainer}>
                    <img 
                      src={`${BASE_URL}/static/images/categories/${category.name.toLowerCase()}.jpg`}
                      alt={category.name}
                      style={styles.categoryImage}
                      onError={(e) => {
                        e.target.src = `${BASE_URL}/static/images/categories/default.jpg`;
                      }}
                    />
                  </div> */}
                  <h4 style={styles.navTitle}>{category.name}</h4>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="tab-content" style={styles.tabContent}>
          {loading ? (
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
          ) : (
            <div className="tab-pane fade show active" style={styles.tabPane}>
              <div className="row gy-5" style={styles.menuItemsRow}>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div className="col-lg-4 menu-item" key={item.id} style={styles.menuItem}>
                      <a 
                        href={`${BASE_URL}${item.image_url}`}
                        className="glightbox"
                        onClick={(e) => {
                          e.preventDefault();
                          openImageLightbox(`${BASE_URL}${item.image_url}`);
                        }}
                        style={styles.menuImageLink}
                      >
                        <img 
                          src={`${BASE_URL}${item.image_url}`}
                          className="menu-img img-fluid" 
                          alt={item.name}
                          style={styles.menuImage}
                        />
                      </a>
                      <h4 style={styles.menuItemH4}>{item.name}</h4>
                      <p className="ingredients" style={styles.ingredients}>
                        {item.description}
                      </p>
                      <div style={styles.priceContainer}>
                      {item.parcel_price && (
                          <p className="parcel-price" style={styles.parcelPrice}>
                            Takeaway: ${item.parcel_price.toFixed(2)}
                          </p>
                        )}
                        <p className="price" style={styles.price}>
                          ${item.price.toFixed(2)}
                        </p>
                       
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12" style={styles.noItems}>
                    No items found in this category
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  menuSection: {
    padding: '60px 0',
    backgroundColor: '#fff',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#37373f',
    marginBottom: '15px',
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#7f7f90',
  },
  highlight: {
    color: '#ce1212',
  },
  navTabs: {
    border: '0',
    marginBottom: '30px',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    backgroundColor: '#fff',
    color: 'rgba(55, 55, 63, 0.8)',
    margin: '0 15px',
    padding: '10px 5px',
    transition: '0.3s',
    borderRadius: '0',
    cursor: 'pointer',
    height: '100%',
    border: '0',
    borderBottom: '2px solid rgba(55, 55, 63, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'none',
  },
  activeNavLink: {
    color: '#ce1212',
    borderColor: '#ce1212',
  },
  navIcon: {
    paddingRight: '15px',
    fontSize: '48px',
    marginBottom: '10px',
  },
  navTitle: {
    fontSize: '18px',
    fontWeight: '400',
    margin: '0',
    fontFamily: '"Poppins", sans-serif',
  },
  tabContent: {
    marginTop: '30px',
  },
  tabPane: {
    animation: 'fadeIn 0.5s ease',
  },
  tabHeader: {
    padding: '30px 0',
  },
  tabHeaderP: {
    fontSize: '14px',
    textTransform: 'uppercase',
    color: 'rgba(55, 55, 63, 0.8)',
    marginBottom: '0',
  },
  tabHeaderH3: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#ce1212',
    marginTop: '10px',
  },
  menuItemsRow: {
    marginTop: '20px',
  },
  menuItem: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  menuImageLink: {
    display: 'block',
    marginBottom: '15px',
  },
  menuImage: {
    padding: '0 60px',
    maxWidth: '100%',
    height: 'auto',
  },
  menuItemH4: {
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '5px',
    fontFamily: '"Poppins", sans-serif',
    color: '#37373f',
  },
  ingredients: {
    fontFamily: '"Playfair Display", serif',
    color: 'rgba(55, 55, 63, 0.7)',
    marginBottom: '5px',
    fontStyle: 'italic',
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ce1212',
    marginTop: '10px',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};
export default MenuPage;