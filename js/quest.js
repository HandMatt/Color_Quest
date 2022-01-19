(function() {
  var game = this.colorQuestGame = this.colorQuestGame || {};

  // level data
  game.questLevels = [
    [ [5, 6], [3] ],
    [ [6], [1, 2] ],
    [ [5, 6] ],
    [ [3], [1, 2], [4] ],
    [ [1, 2], [3], [4], [5, 6] ],
    [ [6], [1, 2], [3], [4] ],
  ];

  // quest model definition
  // quest is a kind of composition, the difference is that quest is specifically used as the question for player to give the answer.
  // so it comes with comparing logic.
  var Quest = game.Quest = (function() {
    function Quest(level) {
      var questData = game.questLevels[level];
      this.data = questData;
    }
    Quest.prototype = new game.Composition(); //extends the Quest prototype from Composition.
    Quest.prototype.isEqualToComposition = function(composition) {
      var a = this.data;
      var b = composition.data;

      // sort each level in both array
      for (var i=0, len=a.length; i<len; i++) {
        a[i].sort();
      }
      for (var i=0, len=b.length; i<len; i++) {
        b[i].sort();
      }
      // flatten both compositions into sequence.
      a = this.toSequence();
      b = composition.toSequence();

      if (a.length !== b.length) return false;
      for (var i=0, len=a.length; i<len; i++) {
        if (parseInt(a[i]) !== parseInt(b[i])) return false;
      }
      return true;
    } 
    return Quest;
  }) ();

  
}) ();