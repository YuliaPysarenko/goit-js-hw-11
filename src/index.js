
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiServis from './newApiServis';
import linksDokQuerySel from './links';
// import SimpleLightbox  from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const link = new linksDokQuerySel;
const newApiServis = new NewApiServis();

link.submitForm.setAttribute(`disabled`, true);
link.searchForm.addEventListener(`submit`, onSubmitForm);
link.submitForm.addEventListener(`click`, onLoadMoreButtonClick )

 async function onSubmitForm(e) {
 e.preventDefault();
  newApiServis.inputValue = e.currentTarget.elements.searchQuery.value;
   clearForm();
   newApiServis.resetPage();
   buttonRemoveClass();
   buttonRemoveIsHidden();
   const render = await newApiServis.fetchPixabay();
  
   if (render.length === 0) {
     errorFetch();
     buttonIsHidden(); 
    } 
  
   renderResponse(render);
    buttonAddClass();

};

 async function onLoadMoreButtonClick() {
   buttonRemoveClass();
   
  const render = await newApiServis.fetchPixabay();
  const renderRes =  renderResponse(render)
  const finishImg = isAndTotalImage(render);

  buttonAddClass(); 
}

 function isAndTotalImage(totalHits) {
   if (totalHits <= 40) {
     buttonIsHidden();
   window.alert("We're sorry, but you've reached the end of search results.");      
  } 
}

function buttonAddClass() { 
  link.submitForm.classList.add(`is-visible`);
  link.submitForm.removeAttribute(`disabled`);
}

function buttonRemoveClass() {
  link.submitForm.classList.remove(`is-visible`);
}

function buttonIsHidden() {
  link.submitForm.classList.add(`is-hidden`);
   buttonRemoveClass();
}

function buttonRemoveIsHidden() {
  link.submitForm.classList.remove(`is-hidden`);
}

 function errorFetch() {
   Notify.failure(`Sorry, there are no images matching your search query. Please try again.`); 
}
 
 function renderResponse(hits) {
    const markup = hits.map((hit) => {
      return `
    <div class="photo-card"> 
       <a class= "photo-link"> 
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" ${hit.largeImageURL}/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
   </a>
</div>
`
    })
    .join(""); 
  link.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  link.gallery.innerHTML = ``;

}

// const lightbox = new SimpleLightbox('.gallery div a', {
//   captionsData: `alt`,
//   captionSelector: `img`,
//   // captionPosition: `bottom`,
//   captionType: 'img alt="${hit.largeImageURL}',
//   captionDelay: 250,
  
// });

// console.log(lightbox)

