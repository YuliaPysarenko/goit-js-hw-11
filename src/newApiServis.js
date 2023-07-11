
import axios from "axios";

// import SimpleLightbox  from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

export default class NewApiServis {
    constructor() {
      this.inputValue = ``;
      this.page = 1;
      this.IPA_KEY = `37860129-0a816fc38343337d9878906bd`; 
      this.total = '';
      this.totalImg = ``;
      this.per_page = 40;
    }

  async fetchPixabay() {
   
   const fetchResponsePixabay = await axios.get(`https://pixabay.com/api/?key=${this.IPA_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=thue&per_page=40&page=${this.page}`)
    const fetchJson = await fetchResponsePixabay.data.hits;
    this.totalImg = await fetchResponsePixabay.data.totalHits;
      console.log(this.totalImg);
    this.incrementPage();
    this.remainderInTotalHits();
  
    return fetchJson;
  }
  
  remainderInTotalHits() {
     this.total = this.totalImg - this.page * this.per_page; 

}

 incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // simpleLitgthBoxes() {
  //    SimpleLightbox.refresh();
  // }
}