export default class GalleryImageService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;

  }

  searchImages(searchQuery) {
    console.log(this)
    const BASE_URL = 'https://pixabay.com/api/?key=24819311-d2b7ac0921a0ad572da5f837a';
    
    const axios = require('axios'); 
    const url = `${BASE_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`

    return axios.get(url)
      .then(function (response) {
        console.log(response.data.totalHits);
        
        return response.data;
        
    
    })
    .catch(function (error) {
      console.log(error);
    })
   
   
  }
  getTotalHits() {
    
  }

  incrementPage() {
    this.page += 1;

  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newGuery) {
    this.searchQuery = newGuery;
  }
}