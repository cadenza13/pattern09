'use strict';

{
  function gameStart(index){
    const result = document.getElementById('result');
    const resultText = document.querySelector('#result > p');
    const cardCase = document.getElementById('cardCase');
    const cardElements = [];
    const cards = [];
    let level;
    let cardOpen = 0;
    let firstCard;
    let firstIndex;
    let totalCard = 0;
    let totalTurn = 0;

    switch(index){
      case 0:
        level = 21;
        break;
      case 1:
        level = 41;
        break;
      case 2:
        level = 61;
        break;
      case 3:
        level = 81;
        break;
      case 4:
        level = 101;
        break;
    }
    
    for(let i = 1; i < level; i++){
      const card = document.createElement('li');
      const cardNumber = Math.round(i / 2);
  
      card.textContent = `${cardNumber}`;
      cardElements.push(card);
    }
  
    for(let i = 0; i < level - 1; i++){
      cards[i] = cardElements.splice(Math.floor(Math.random() * cardElements.length), 1)[0];
      cardCase.appendChild(cards[i]);
    }
  
    cards.forEach((card, index) =>{
      card.addEventListener('click', () =>{
        if(index === firstIndex) return;
  
        card.style.transform = 'scaleX(0)';
        setTimeout(() =>{
          card.classList.add('open');
          card.style.transform = 'none';
        }, 500);
  
        cardOpen++;
        if(cardOpen === 2){
          totalTurn++;
          mask.classList.remove('hidden');
          if(card.textContent === firstCard){
            setTimeout(() =>{
              card.classList.add('align');
              cards[firstIndex].classList.add('align');
              mask.classList.add('hidden');
              cardOpen = 0;
              totalCard += 2;
              if(totalCard === cards.length){
                result.classList.remove('hidden');
                resultText.textContent = `RESULT : ${totalTurn}回`;
              }
            }, 1500);
          } else {
            setTimeout(() =>{
              card.classList.remove('open');
              cards[firstIndex].classList.remove('open');
              mask.classList.add('hidden');
              cardOpen = 0;
              firstIndex = undefined;
            }, 1500);
          }
        } else {
          firstCard = card.textContent;
          firstIndex = index;
        }
      });
    });
  }

  const mask = document.getElementById('mask');
  const title = document.getElementById('title');
  const rule = document.getElementById('rule');
  const ruleBtn = document.getElementById('ruleBtn');
  const levelBtn = document.querySelectorAll('#level > li');
  const ruleReturnBtn = document.querySelector('#rule > p');

  ruleBtn.addEventListener('click', () =>{
    mask.classList.remove('hidden');
    rule.classList.remove('hidden');
  });

  ruleReturnBtn.addEventListener('click', () =>{
    mask.classList.add('hidden');
    rule.classList.add('hidden');
  });

  levelBtn.forEach((level, index) =>{
    level.addEventListener('click', () =>{
      title.classList.add('hidden');
      gameStart(index);
    });
  });
}