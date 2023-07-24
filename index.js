import characterData from "./data.js";
import Character from "./Character.js";

let monstersArray = ["mons", "demon", "goblin"];

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  wizard.getDiceHtml();
  mons.getDiceHtml();
  wizard.takeDamage(mons.currentDiceScore);
  mons.takeDamage(wizard.currentDiceScore);
  render();

  if (wizard.dead || mons.dead) {
    endGame();
  }
}

function endGame() {
  const endMessage =
    wizard.health === 0 && mons.health === 0
      ? "No victors - all creatures are dead"
      : wizard.health > 0
      ? "The Wizard Wins"
      : "The mons is Victorious";

  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `;
}

document.getElementById("attack-button").addEventListener("click", attack);

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = mons.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
