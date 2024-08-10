const cardsContainer = document.getElementById('phone-cards');
const showMoreBtn = document.getElementById('show-more-btn');
const loader = document.getElementById('loading-spinner');

function loadData() {
  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('keyup', async () => {
    loadingSpinner(true);
    cardsContainer.innerHTML = '';
    displayMoreBtn(false);
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`);
    const data = await res.json();
    showCard(data);
    displayMoreBtn(true, data.data.length);
  })
}

function loadingSpinner(isLoading) {
  if (isLoading) {
    loader.classList.remove('hidden');
  }
  else {
    loader.classList.add('hidden');
  }
}
function displayMoreBtn(notBlank, count) {
  if (notBlank && count > 9) {
    showMoreBtn.classList.remove('hidden');
  }
  else {
    showMoreBtn.classList.add('hidden');
  }
}

function showCard(data) {
  data.data.slice(0, 9).forEach(phone => {
    const card = document.createElement('div');
    card.classList = 'card rounded-xl bg-white shadow-xl mx-auto';
    card.innerHTML = `
      <figure class="p-4 pb-0">
        <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-lg" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn py-0 btn-primary">Show Details</button>
        </div>
      </div>`;
    cardsContainer.appendChild(card);
  });
  displayMoreBtn(false);
}

loadData();