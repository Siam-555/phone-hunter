const cardsContainer = document.getElementById('phone-cards');
const showMoreBtn = document.getElementById('show-more-btn');
const loader = document.getElementById('loading-spinner');
const searchBox = document.getElementById('search-box');

function writeOnSearch() {
  searchBox.addEventListener('keyup', () => {
    loadData();
    loadingSpinner(true);
  })
}

async function loadData(allData) {
  cardsContainer.innerHTML = '';
  displayMoreBtn(false);
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`);
  let data = await res.json();
  showCard(data, allData);
  displayMoreBtn(true, data.data.length);
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

function showCard(data, allData) {
  let dataOfPhones;
  if (allData) {
    dataOfPhones = data.data;
  }
  else {
    dataOfPhones = data.data.slice(0, 9);
  }

  dataOfPhones.forEach(phone => {
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

writeOnSearch();

showMoreBtn.addEventListener('click', () => {
  loadData(true);
})

function showDetails(id) {
  return ``
}