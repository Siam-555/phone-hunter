const cardsContainer = document.getElementById('phone-cards');
const searchBtn = document.getElementById('search-btn');

function loadData() {
  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('keyup', async () => {
    cardsContainer.innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`);
    const data = await res.json();
    showCard(data);
  })
}

function showCard(data) {
  console.log(data.data.slice(0, 3));
  if (data.data.length > 9) {
    searchBtn.classList.remove('hidden');
  }
  else {
    searchBtn.classList.add('hidden')
  }
  // data.data.slice(0, 9);
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
}

loadData();