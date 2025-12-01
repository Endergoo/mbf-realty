import React, { useState, useEffect } from 'react';
import Listing from './../components/Listing';
import HouseMod from './../components/HouseMod';
import SideSearch from './../components/SideSearch';
import './../css/Listings.css';

const Listings = () => 
{ 
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    features: '',
    main_image: null
  });
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' });
  const [validationErrors, setValidationErrors] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    beds: '',
    baths: ''
  });
  
  const API_URL = 'https://mbf-server-zt5i.onrender.com';

  // Client-side validation
  const validateForm = () => 
  {
    const errors = {};
    
    if (!formData.name || formData.name.length < 3 || formData.name.length > 100) 
    {
      errors.name = 'Name must be between 3 and 100 characters';
    }
    
    const size = parseInt(formData.size);
    if (!formData.size || size < 100 || size > 10000) 
    {
      errors.size = 'Size must be between 100 and 10000 sq ft';
    }
    
    const bedrooms = parseInt(formData.bedrooms);
    if (!formData.bedrooms || bedrooms < 1 || bedrooms > 20 || !Number.isInteger(bedrooms)) 
    {
      errors.bedrooms = 'Bedrooms must be a whole number between 1 and 20';
    }
    
    const bathrooms = parseFloat(formData.bathrooms);
    if (!formData.bathrooms || bathrooms < 1 || bathrooms > 20) 
    {
      errors.bathrooms = 'Bathrooms must be between 1 and 20';
    }
    
    if (!formData.features || formData.features.trim().length === 0) 
    {
      errors.features = 'At least one feature is required';
    }
    
    if (!showEditForm && !formData.main_image) 
    {
      errors.main_image = 'Image is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch all listings
  useEffect(() => 
  {
    fetchListings();
  }, []);

  const fetchListings = async () => 
  {
    try 
    {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/houses`);
      
      if (!response.ok) 
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate listings
      const validListings = Array.isArray(data) 
        ? data.filter(listing => listing && listing._id)
        : [];
      
      setListings(validListings);
      setFilteredListings(validListings);
      
    } 
    catch (error) 
    {
      console.error('Error fetching listings:', error);
      setError('Failed to load listings. Please try again later.');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  // Handle filter application
  const handleApplyFilters = () => 
  {
    let filtered = listings;

    if (filters.location) 
    {
      filtered = filtered.filter(listing => 
        listing.name?.toLowerCase().includes(filters.location.toLowerCase()) ||
        listing.address?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.price) 
    {
      filtered = filtered.filter(listing => 
      {
        const listingPrice = listing.price || 0;
        switch (filters.price) 
        {
          case '0-200000':
            return listingPrice <= 200000;
          case '200000-400000':
            return listingPrice > 200000 && listingPrice <= 400000;
          case '400000-999999999':
            return listingPrice > 400000;
          default:
            return true;
        }
      });
    }

    if (filters.beds) 
    {
      const minBeds = parseInt(filters.beds);
      filtered = filtered.filter(listing => listing.bedrooms >= minBeds);
    }

    if (filters.baths) 
    {
      const minBaths = parseInt(filters.baths);
      filtered = filtered.filter(listing => listing.bathrooms >= minBaths);
    }

    setFilteredListings(filtered);
  };

  // Update filters when inputs change
  const handleFilterChange = () => 
  {
    const location = document.getElementById('location-filter')?.value || '';
    const price = document.getElementById('price-filter')?.value || '';
    const beds = document.getElementById('beds-filter')?.value || '';
    const baths = document.getElementById('baths-filter')?.value || '';
    
    setFilters({ location, price, beds, baths });
  };

  const handleHouseClick = (house) => 
  {
    if (house && house._id) 
    {
      setSelectedHouse(house);
    }
  };

  const closeModal = () => 
  {
    setSelectedHouse(null);
  };

  const clearFilters = () => 
  {
    const locationInput = document.getElementById('location-filter');
    const priceSelect = document.getElementById('price-filter');
    const bedsSelect = document.getElementById('beds-filter');
    const bathsSelect = document.getElementById('baths-filter');
    
    if (locationInput) locationInput.value = '';
    if (priceSelect) priceSelect.value = '';
    if (bedsSelect) bedsSelect.value = '';
    if (bathsSelect) bathsSelect.value = '';
    
    setFilters({ location: '', price: '', beds: '', baths: '' });
    setFilteredListings(listings);
  };

  // Handle form input changes
  const handleFormChange = (e) => 
  {
    const { name, value, files } = e.target;
    
    if (name === 'main_image') 
    {
      setFormData(prev => ({
        ...prev,
        main_image: files[0]
      }));
    } 
    else 
    {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Open Add Form
  const openAddForm = () => {
    setFormData({
      name: '',
      size: '',
      bedrooms: '',
      bathrooms: '',
      features: '',
      main_image: null
    });
    setValidationErrors({});
    setSubmitStatus({ message: '', type: '' });
    setShowAddForm(true);
  };

  // Open Edit Form
  const openEditForm = (house) => {
    setEditingHouse(house);
    setFormData({
      name: house.name,
      size: house.size.toString(),
      bedrooms: house.bedrooms.toString(),
      bathrooms: house.bathrooms.toString(),
      features: house.features.join(', '),
      main_image: null
    });
    setValidationErrors({});
    setSubmitStatus({ message: '', type: '' });
    setShowEditForm(true);
    setSelectedHouse(null);
  };

  // Handle Add House Submit
  const handleAddHouseSubmit = async (e) => 
  {
    e.preventDefault();
    setSubmitStatus({ message: '', type: '' });

    if (!validateForm()) {
      setSubmitStatus({ 
        message: 'Please fix validation errors', 
        type: 'error' 
      });
      return;
    }

    try 
    {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('bedrooms', formData.bedrooms);
      formDataToSend.append('bathrooms', formData.bathrooms);
      
      const featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
      
      formDataToSend.append('features', JSON.stringify(featuresArray));
      formDataToSend.append('main_image', formData.main_image);

      const response = await fetch(`${API_URL}/api/houses`, {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) 
      {
        setSubmitStatus({ 
          message: 'House added successfully!', 
          type: 'success' 
        });
        
        // Refresh listings
        await fetchListings();
        
        // Close form after 2 seconds
        setTimeout(() => {
          setShowAddForm(false);
          setSubmitStatus({ message: '', type: '' });
        }, 2000);
      } 
      else 
      {
        setSubmitStatus({ 
          message: result.message || 'Failed to add house', 
          type: 'error' 
        });
      }
    } 
    catch (error) 
    {
      console.error('Error adding house:', error);
      setSubmitStatus({ 
        message: 'Error submitting form. Please try again.', 
        type: 'error' 
      });
    }
  };

  // Handle Edit House Submit
  const handleEditHouseSubmit = async (e) => 
  {
    e.preventDefault();
    setSubmitStatus({ message: '', type: '' });

    if (!validateForm()) {
      setSubmitStatus({ 
        message: 'Please fix validation errors', 
        type: 'error' 
      });
      return;
    }

    try 
    {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('bedrooms', formData.bedrooms);
      formDataToSend.append('bathrooms', formData.bathrooms);
      
      const featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
      
      formDataToSend.append('features', JSON.stringify(featuresArray));
      
      if (formData.main_image) {
        formDataToSend.append('main_image', formData.main_image);
      }

      const response = await fetch(`${API_URL}/api/houses/${editingHouse._id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) 
      {
        setSubmitStatus({ 
          message: 'House updated successfully!', 
          type: 'success' 
        });
        
        // Refresh listings
        await fetchListings();
        
        // Close form after 2 seconds
        setTimeout(() => {
          setShowEditForm(false);
          setEditingHouse(null);
          setSubmitStatus({ message: '', type: '' });
        }, 2000);
      } 
      else 
      {
        setSubmitStatus({ 
          message: result.message || 'Failed to update house', 
          type: 'error' 
        });
      }
    } 
    catch (error) 
    {
      console.error('Error updating house:', error);
      setSubmitStatus({ 
        message: 'Error submitting form. Please try again.', 
        type: 'error' 
      });
    }
  };

  // Handle Delete House
  const handleDeleteHouse = async (houseId) => {
    if (!window.confirm('Are you sure you want to delete this house?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/houses/${houseId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({ 
          message: 'House deleted successfully!', 
          type: 'success' 
        });
        
        // Refresh listings
        await fetchListings();
        
        // Close modal if open
        setSelectedHouse(null);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setSubmitStatus({ message: '', type: '' });
        }, 3000);
      } else {
        setSubmitStatus({ 
          message: result.message || 'Failed to delete house', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error deleting house:', error);
      setSubmitStatus({ 
        message: 'Error deleting house. Please try again.', 
        type: 'error' 
      });
    }
  };

  // Add event listeners to filter inputs
  useEffect(() => 
  {
    const locationInput = document.getElementById('location-filter');
    const priceSelect = document.getElementById('price-filter');
    const bedsSelect = document.getElementById('beds-filter');
    const bathsSelect = document.getElementById('baths-filter');
    
    if (locationInput) locationInput.addEventListener('input', handleFilterChange);
    if (priceSelect) priceSelect.addEventListener('change', handleFilterChange);
    if (bedsSelect) bedsSelect.addEventListener('change', handleFilterChange);
    if (bathsSelect) bathsSelect.addEventListener('change', handleFilterChange);
    
    return () => 
    {
      if (locationInput) locationInput.removeEventListener('input', handleFilterChange);
      if (priceSelect) priceSelect.removeEventListener('change', handleFilterChange);
      if (bedsSelect) bedsSelect.removeEventListener('change', handleFilterChange);
      if (bathsSelect) bathsSelect.removeEventListener('change', handleFilterChange);
    };
  }, []);

  if (loading) 
  {
    return (
      <div className="listings-page">
        <h1>All Properties</h1>
        <div className="loading">Loading listings...</div>
      </div>
    );
  }

  if (error) 
  {
    return (
      <div className="listings-page">
        <h1>All Properties</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="listings-page">
      <h1>All Properties</h1>
      
      {submitStatus.message && !showAddForm && !showEditForm && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      
      <button onClick={openAddForm} className="add-house-btn">
        + Add New House
      </button>
      
      <SideSearch onApplyFilters={handleApplyFilters} />
      
      {(filters.location || filters.price || filters.beds || filters.baths) && (
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      )}
      
      <div className="results-count">
        Showing {filteredListings.length} of {listings.length} properties
      </div>
      
      {filteredListings.length === 0 ? (
        <div className="no-listings">
          No properties match your search criteria. 
          <button onClick={clearFilters} className="clear-search-btn">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <div key={listing._id} className="listing-card-wrapper">
              <Listing 
                listing={listing} 
                onClick={handleHouseClick}
              />
              <div className="listing-actions">
                <button 
                  onClick={() => openEditForm(listing)} 
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteHouse(listing._id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHouse && (
        <HouseMod house={selectedHouse} onClose={closeModal} />
      )}

      {/* Add House Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowAddForm(false)}>
              &times;
            </button>
            
            <h2>Add New House</h2>
            
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleAddHouseSubmit}>
              <div>
                <label htmlFor="name">House Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={validationErrors.name ? 'input-error' : ''}
                />
                {validationErrors.name && (
                  <span className="error-text">{validationErrors.name}</span>
                )}
              </div>

              <div>
                <label htmlFor="size">Size (sq ft):</label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleFormChange}
                  className={validationErrors.size ? 'input-error' : ''}
                />
                {validationErrors.size && (
                  <span className="error-text">{validationErrors.size}</span>
                )}
              </div>

              <div>
                <label htmlFor="bedrooms">Bedrooms:</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleFormChange}
                  className={validationErrors.bedrooms ? 'input-error' : ''}
                />
                {validationErrors.bedrooms && (
                  <span className="error-text">{validationErrors.bedrooms}</span>
                )}
              </div>

              <div>
                <label htmlFor="bathrooms">Bathrooms:</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleFormChange}
                  step="0.5"
                  className={validationErrors.bathrooms ? 'input-error' : ''}
                />
                {validationErrors.bathrooms && (
                  <span className="error-text">{validationErrors.bathrooms}</span>
                )}
              </div>

              <div>
                <label htmlFor="features">Features (comma-separated):</label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleFormChange}
                  placeholder="e.g. Pool, Garage, Garden"
                  className={validationErrors.features ? 'input-error' : ''}
                />
                {validationErrors.features && (
                  <span className="error-text">{validationErrors.features}</span>
                )}
              </div>

              <div>
                <label htmlFor="main_image">Main Image:</label>
                <input
                  type="file"
                  id="main_image"
                  name="main_image"
                  onChange={handleFormChange}
                  accept="image/*"
                  className={validationErrors.main_image ? 'input-error' : ''}
                />
                {validationErrors.main_image && (
                  <span className="error-text">{validationErrors.main_image}</span>
                )}
              </div>

              <button type="submit">Add House</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit House Form Modal */}
      {showEditForm && (
        <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowEditForm(false)}>
              &times;
            </button>
            
            <h2>Edit House</h2>
            
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleEditHouseSubmit}>
              <div>
                <label htmlFor="edit-name">House Name:</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={validationErrors.name ? 'input-error' : ''}
                />
                {validationErrors.name && (
                  <span className="error-text">{validationErrors.name}</span>
                )}
              </div>

              <div>
                <label htmlFor="edit-size">Size (sq ft):</label>
                <input
                  type="number"
                  id="edit-size"
                  name="size"
                  value={formData.size}
                  onChange={handleFormChange}
                  className={validationErrors.size ? 'input-error' : ''}
                />
                {validationErrors.size && (
                  <span className="error-text">{validationErrors.size}</span>
                )}
              </div>

              <div>
                <label htmlFor="edit-bedrooms">Bedrooms:</label>
                <input
                  type="number"
                  id="edit-bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleFormChange}
                  className={validationErrors.bedrooms ? 'input-error' : ''}
                />
                {validationErrors.bedrooms && (
                  <span className="error-text">{validationErrors.bedrooms}</span>
                )}
              </div>

              <div>
                <label htmlFor="edit-bathrooms">Bathrooms:</label>
                <input
                  type="number"
                  id="edit-bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleFormChange}
                  step="0.5"
                  className={validationErrors.bathrooms ? 'input-error' : ''}
                />
                {validationErrors.bathrooms && (
                  <span className="error-text">{validationErrors.bathrooms}</span>
                )}
              </div>

              <div>
                <label htmlFor="edit-features">Features (comma-separated):</label>
                <input
                  type="text"
                  id="edit-features"
                  name="features"
                  value={formData.features}
                  onChange={handleFormChange}
                  placeholder="e.g. Pool, Garage, Garden"
                  className={validationErrors.features ? 'input-error' : ''}
                />
                {validationErrors.features && (
                  <span className="error-text">{validationErrors.features}</span>
                )}
              </div>

              <div>
                <label htmlFor="edit-main_image">Main Image (optional - leave empty to keep current):</label>
                <input
                  type="file"
                  id="edit-main_image"
                  name="main_image"
                  onChange={handleFormChange}
                  accept="image/*"
                />
              </div>

              <button type="submit">Update House</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;