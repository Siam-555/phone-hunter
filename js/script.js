const cardsContainer = document.getElementById('phone-cards');

async function loadData() {
  const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const data = await res.json();
  showCard(data);
}

function showCard(data) {
  console.log(data.data.forEach(phone => {
    console.log(phone);
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
  }));
}

loadData();