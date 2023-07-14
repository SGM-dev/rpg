const hero = {
  elementId: "hero",
  name: "Wizard",
  avatar: "images/wizard.png",
  health: 60,
  diceRoll: [3, 1, 4],
  diceCount: 3,
};

const monster = {
  elementId: "monster",
  name: "Orc",
  avatar: "images/orc.png",
  health: 10,
  diceRoll: [2],
  diceCount: 1,
};

function renderCharacter(data) {
  const { elementId, name, avatar, health, diceRoll, diceCount } = data;

  let diceHtml = ``;
  for (let i = 0; i < diceCount; i++) {
    diceHtml += `<div class="dice">${diceRoll[i]}</div>`;
  }

  document.getElementById(elementId).innerHTML = `<div class="character-card">
           <h4 class="name"> ${name} </h4>
           <img class="avatar" src="${avatar}" />
           <div class="health">health: <b> ${health} </b></div>
           <div class="dice-container">
               ${diceHtml}
           </div>
       </div>`;
}

renderCharacter(hero);
renderCharacter(monster);
