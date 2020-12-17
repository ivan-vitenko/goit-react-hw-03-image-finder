async function fetchPixabayImages(query, page) {
  const response = await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=3749534-832657ce2c7737c7c4ba585dd`,
  );
  return await response.json();
}

const api = {
  fetchPixabayImages,
};

export default api;
