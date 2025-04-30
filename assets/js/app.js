document.getElementById('draw-card').addEventListener('click', () => {
    fetch('/data/harrow-deck.json')
      .then(response => response.json())
      .then(deck => {
        const randomCard = deck[Math.floor(Math.random() * deck.length)];
        document.getElementById('card-display').innerHTML = `
          <img src="assets/images/${randomCard.image}" alt="${randomCard.name}">
          <p>${randomCard.name}: ${randomCard.description}</p>
        `;
      });
  });
  