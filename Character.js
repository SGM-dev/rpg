import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

function Character(data) {
  Object.assign(this, data);

  this.diceArray = getDicePlaceholderHtml(this.diceCount);
  this.maxHealth = this.health;

  this.getDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  };

  this.getHealthBarHtml = function () {
    const percent = getPercentage(this.health, this.maxHealth);
    return `
    <div class="health-bar-outer">
      <div class="health-bar-inner ${percent <= 25 ? "danger" : ""} " 
        style="width: ${percent}%;">
      </div>
    </div>`;
  };

  this.takeDamage = function (currentDiceScore) {
    const totalAttackScore = currentDiceScore.reduce(
      (total, num) => total + num
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  };

  this.getCharacterHtml = function () {
    const { elementId, name, avatar, health, diceArray } = this;
    const healthBar = this.getHealthBarHtml();

    return `<div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">    
                ${diceArray}
            </div>
        </div>`;
  };
}

export default Character;
