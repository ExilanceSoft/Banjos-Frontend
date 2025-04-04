import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('*');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const BASE_URL = "http://64.227.163.17:8000";

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://64.227.163.17:8000/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu data');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  const filteredItems = menuItems.filter(item => {
    if (activeFilter === '*') return item.category_name === 'special';
    if (activeFilter === 'filter-veg') return item.category_name === 'special' && item.is_veg;
    if (activeFilter === 'filter-non-veg') return item.category_name === 'special' && !item.is_veg;
    return false;
  });

  if (loading) return (
    <section style={styles.menuSection}>
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    </section>
  );

  if (error) return (
    <section style={styles.menuSection}>
      <div style={styles.errorContainer}>
        <div style={styles.alert}>Error: {error}</div>
      </div>
    </section>
  );

  return (
    <section id="menu" style={styles.menuSection}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Menu</h2>
          <div style={styles.titleUnderline}>Check Our Yummy Menu</div>
          <p style={styles.sectionSubtitle}> <span style={styles.highlight}></span></p>
        </div>

        <div style={styles.menuTabs}>
          <ul style={styles.navTabs}>
            {['*', 'filter-veg', 'filter-non-veg'].map((filter) => (
              <li key={filter} style={styles.navItem}>
                <button 
                  style={activeFilter === filter ? {...styles.navButton, ...styles.activeTab} : styles.navButton}
                  onClick={() => setActiveFilter(filter)}
                >
                  <h4 style={styles.tabTitle}>
                    {filter === '*' ? 'All' : filter === 'filter-veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </h4>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.menuContainer}>
          {filteredItems.map(item => (
            <div key={item.id} style={styles.menuItem}>
              <div style={styles.menuImageContainer}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={`${BASE_URL}${item.image_url}`}
                  style={{
                    ...styles.menuImage,
                    transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                  alt={item.name}
                />
              </div>
              <div style={styles.menuContent}>
                <div style={styles.menuHeader}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <span style={styles.itemPrice}>${item.price.toFixed(2)}</span>
                </div>
                <p style={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  menuSection: {
    padding: '60px 0',
    backgroundColor: '#fff',
    fontFamily: '"Open Sans", sans-serif',
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
    fontSize: 18,
    letterSpacing: '1px',
    fontWeight: 700,
    padding: '8px 20px',
    margin: 0,
    color: 'black',
    display: 'inline-block',
    textTransform: 'uppercase',
    borderRadius: 50,
    fontFamily: 'var(--default-font)'
  },
  titleUnderline: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 10,
    backgroundImage: 'linear-gradient(120deg, rgb(51, 51, 51), rgb(228, 20, 28))',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
  },
  sectionSubtitle: {
    fontSize: '25px',
    fontweight: '700',
    marginBottom: '10px',
    backgroundColor:'linear-gradient(120deg, rgb(51, 51, 51), rgb(228, 20, 28)) text;',
    position: 'relative',
  },
  highlight: {
    color: '#ce1212',
    fontWeight: '600',
  },
  menuTabs: {
    margin: '40px 0',
  },
  navTabs: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    gap: '20px',
  },
  navItem: {
    margin: '0 5px',
  },
  navButton: {
    padding: '12px 30px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    color: '#ce1212',
    borderColor: '#ce1212',
  },
  tabTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  menuContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  menuImageContainer: {
    flexShrink: 0,
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid #fff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  menuImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  menuContent: {
    flex: 1,
  },
  menuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  itemName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1814',
    margin: 0,
  },
  itemPrice: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ce1212',
  },
  itemDescription: {
    fontSize: '0.9rem',
    color: '#7f7f7f',
    lineHeight: '1.6',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#ce1212',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  alert: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
};

export default Menu;