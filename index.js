
  const icons = ['Apple', 'Banana', 'Grapes', 'Cherry', 'Mango', 'orange', 'Kiwi', 'Berry'];
  let cardValues = [];
  let flippedCards = [];
  let lockBoard = false;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function createCard(icon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${icon}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, icon));
    return card;
  }

  function flipCard(card, icon) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push({ card, icon });

    if (flippedCards.length === 2) {
      lockBoard = true;
      const [first, second] = flippedCards;

      if (first.icon === second.icon) {
        flippedCards = [];
        lockBoard = false;
      } else {
        setTimeout(() => {
          first.card.classList.remove('flipped');
          second.card.classList.remove('flipped');
          flippedCards = [];
          lockBoard = false;
        }, 800);
      }
    }
  }

  function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cardValues = shuffle([...icons, ...icons]);
    cardValues.forEach(icon => {
      gameBoard.appendChild(createCard(icon));
    });
  }
  startGame();
