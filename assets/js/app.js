let deck = [];

fetch('data/harrow-deck.json')
  .then(res => res.json())
  .then(data => {
    deck = data;
    populateConstellationDropdowns(data);
  });

function drawRandomCards(count) {
  const shuffled = [...deck].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function drawCardsFromConstellations(constellations) {
  return constellations.map(c => {
    const matches = deck.filter(card => card.constellation === c);
    return matches[Math.floor(Math.random() * matches.length)];
  });
}

function renderCards(cards, grid = false) {
  const display = document.getElementById('card-display');
  display.className = grid ? 'grid' : '';
  display.innerHTML = cards.map(card => `
    <div class="card">
      <img src="assets/images/${card.image}" alt="${card.name}">
      <h3>${card.name}</h3>
      <p>${card.description}</p>
    </div>
  `).join('');
}

document.getElementById('draw-three').addEventListener('click', () => {
  renderCards(drawRandomCards(3));
});

document.getElementById('draw-nine').addEventListener('click', () => {
  renderCards(drawRandomCards(9), true);
});

document.getElementById('draw-by-constellation').addEventListener('click', () => {
  const c1 = document.getElementById('constellation-select-1').value;
  const c2 = document.getElementById('constellation-select-2').value;
  const c3 = document.getElementById('constellation-select-3').value;
  renderCards(drawCardsFromConstellations([c1, c2, c3]));
});

function populateConstellationDropdowns(data) {
  const selects = [
    document.getElementById('constellation-select-1'),
    document.getElementById('constellation-select-2'),
    document.getElementById('constellation-select-3')
  ];
  const constellations = [...new Set(data.map(card => card.constellation))];
  selects.forEach(select => {
    constellations.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  });
}
