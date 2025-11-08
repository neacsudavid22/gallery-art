const BASE_URL = import.meta.env.VITE_API_URL + '/api/art';

export const getArtByStyle = async (style) => {
  const res = await fetch(`${BASE_URL}/style/${style}`,{
    credentials: 'include',
    method: 'GET'
  });
  return await res.json();
};

export const getArtById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`,{
    credentials: 'include',
    method: 'GET',
  });
  return await res.json();
};

export const getArtByTitle = async (title) => {
  const res = await fetch(`${BASE_URL}/search?qtitle=${title}`,{
    credentials: 'include',
    method: 'GET',
  });
  return await res.json();
};

export const createArt = async (formData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: formData, 
    credentials: 'include'
  });
  return await res.json();
};

export const updateArt = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData, 
    credentials: 'include'
  });
  return await res.json();
};
   

export const deleteArt = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { 
    method: 'DELETE', 
    credentials: 'include'
  });
  return await res.json();
};
