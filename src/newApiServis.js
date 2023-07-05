//  const axios = require('axios').default;
import axios from "axios";
import SimpleLightbox  from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export default class NewApiServis {
    constructor() {
      this.inputValue = ``;
      this.page = 1;
      this.IPA_KEY = `37860129-0a816fc38343337d9878906bd`; 
      this.total = 0;
    }

  async fetchPixabay() {
   
   const fetchResponsePixabay = await axios.get(`https://pixabay.com/api/?key=${this.IPA_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=thue&per_page=40&page=${this.page}`)
    const fetchJson = await fetchResponsePixabay.data.hits;
    const totalHit = await fetchResponsePixabay.totalHit;
    this.incrementPage()
    // this.simpleLitgthBoxes()
    return fetchJson;
  }
  
  //  fetchPixabay() {
  //     return fetch(`https://pixabay.com/api/?key=${this.IPA_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=thue&per_page=40&page=${this.page}`)
  //     .then(response => response.json())
  //   .then((data) => {
  //     // data.totalHits === this.total
  //     this.incrementPage()
  //     // this.totalHits(data)
  //       //  this.totalHits()
  //     return data.hits; 
  //     })
  // }


  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  simpleLitgthBoxes() {
     SimpleLightbox.refresh();
  }
  // totalHits(data) {
  //   if (this.total === data.totalHits) {
  //   alert("We're sorry, but you've reached the end of search results.")
  // }  
  // }

}