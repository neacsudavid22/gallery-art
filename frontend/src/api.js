const BASE_URL = 'http://localhost:3000/api/art';

// Get all artworks by style
export const getArtByStyle = async (style) => {
  const res = await fetch(`${BASE_URL}/style/${style}`,{
    credentials: 'include',
    method: 'GET'
  });
  return await res.json();
};

// Get one artwork by id
export const getArtById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`,{
    credentials: 'include',
    method: 'GET',
  });
  return await res.json();
};

// Create new artwork (with image)
export const createArt = async (formData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: formData, 
    credentials: 'include'
  });
  return await res.json();
};

// Update existing artwork
export const updateArt = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData, 
    credentials: 'include'
  });
  return await res.json();
};
   

// Delete artwork
export const deleteArt = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { 
    method: 'DELETE', 
    credentials: 'include'
  });
  return await res.json();
};
