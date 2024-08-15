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
          <button onclick="handleShowDetails('${phone.slug}')" class="btn py-0 btn-primary">Show Details</button>
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

async function handleShowDetails(id) {
  const phoneInfo = await (await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)).json();
  showDetails(phoneInfo.data);
}

const showDetails = (phone) => {
  console.log(phone);
  phone_information.showModal();

  const phoneContainer = document.getElementById('phone_information');
  phoneContainer.innerHTML = `
      <div class="modal-box py-8 bg-gray-200">
        <img class="mx-auto mb-6" src="${phone.image}" />
        <h3 id="phone-name" class="text-lg my-2 font-bold">${phone.name}</h3>
        <div>
        <p><span class="font-bold">Storage :</span> ${phone.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Chipset :</span> ${phone.mainFeatures.chipSet}</p>
        <p><span class="font-bold">Memory :</span> ${phone.mainFeatures.memory}</p>
        <p><span class="font-bold">Slug :</span> ${phone.slug}</p>
        <p><span class="font-bold">Release Date :</span> ${phone.releaseDate}</p>
        <p><span class="font-bold">Brand :</span> ${phone.brand}</p>
        <p><span class="font-bold">GPS :</span> ${phone.others?.GPS}</p>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>`
}