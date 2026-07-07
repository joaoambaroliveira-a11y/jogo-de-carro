const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '7', '💎'];
let balance = 1000;

const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const balanceEl = document.getElementById('balance');
const resultEl = document.getElementById('result');
const spinBtn = document.getElementById('spin');
const betInput = document.getElementById('bet');

function spinReel(reel) {
  return new Promise(resolve => {
    let spins = 0;
    const interval = setInterval(() => {
      reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      spins++;
      if (spins > 15) {
        clearInterval(interval);
        resolve();
      }
    }, 80);
  });
}

async function spin() {
  const bet = parseInt(betInput.value);
  
  if (bet > balance) {
    resultEl.textContent = "❌ Ou pa gen ase lajan!";
    return;
  }
  
  spinBtn.disabled = true;
  resultEl.textContent = "🔄 W ap fè woule...";
  
  balance -= bet;
  balanceEl.textContent = balance;

  // Woule 3 roulo yo
  await Promise.all([
    spinReel(reel1),
    spinReel(reel2),
    spinReel(reel3)
  ]);

  const final1 = reel1.textContent;
  const final2 = reel2.textContent;
  const final3 = reel3.textContent;

  // Kalkile genyen
  let win = 0;
  if (final1 === final2 && final2 === final3) {
    win = bet * 10;
    resultEl.innerHTML = `🎉 JACKPOT! Ou genyen ${win} Goud!`;
  } else if (final1 === final2 || final2 === final3 || final1 === final3) {
    win = bet * 2;
    resultEl.innerHTML = `👍 Ou genyen ${win} Goud!`;
  } else {
    resultEl.textContent = "😢 Ou pèdi... Eseye ankò!";
  }

  balance += win;
  balanceEl.textContent = balance;
  
  spinBtn.disabled = false;
}

spinBtn.addEventListener('click', spin);
