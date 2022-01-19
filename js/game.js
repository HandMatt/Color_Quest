// anonymous function to put all variables local scope by default.
(function(){
  var game = this.colorQuestGame = this.colorQuestGame || {};

  // Main Game Logic
  game.flow = {
    currentLevel: -1,
    maxLevel: game.questLevels.length - 1,
    startOver: function() {
      game.startScene.hide();
      game.summaryScene.hide();
      game.gameoverScene.hide();
      game.gameScene.hide();
      game.startScene.show();
      this.currentLevel = -1;
    },
    gameWin: function() {
      game.gameScene.hide();
      game.summaryScene.show();
      game.timer.stop();
    },
    gameOver: function() {
      game.startScene.show();
      game.gameScene.hide();
      game.gameoverScene.show();
      game.timer.stop();
    },
    nextLevel: function() {
      this.currentLevel+=1;
      if (this.currentLevel >= this.maxLevel) this.currentLevel = this.maxLevel;

      game.gameScene.updateLevelInfo(this.currentLevel+1); // when displaying level, we start from 1 instead of 0, so +1 here.

      game.startScene.hide();
      game.summaryScene.hide();
      game.gameScene.show();
      game.compositionView.node.removeAllChildren();
      this.startLevel();
    },
    finishLevel: function() {
      game.gameScene.hide();
      game.summaryScene.show();
    },
    startLevel: function() {
      game.quest = new game.Quest(this.currentLevel);
      game.compositionSeq = [];
      game.composition = new game.Composition();
      game.gameScene.visualize(game.quest);
      game.gameScene.handleInput();
      game.timer.restart();
    },
  } 


  // Entry Point
  var init = function() {
    console.log("Welcome to Color Quest Game.");

    game.startScene.handleInput();
    game.summaryScene.handleInput();
    game.gameoverScene.handleInput();
    game.gameScene.handleInput();

  }

  // window.onload = init; // use window.onload (or when DOM ready) if the script is not placed at the end of the HTML file.
  init(); // start the game


})(); // self executing function


