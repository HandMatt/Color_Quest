(function () {
  var game = this.colorQuestGame = this.colorQuestGame || {};

  // composition model definition
  // composition is a deck of pattern put together
  var Composition = game.Composition = (function () {
    function Composition() {
      this.data = [];
    }
    Composition.prototype.toSequence = function(){
      var seq = [];
      for (var i=0; i < this.data.length; i++) {
        for (var j=0; j < this.data[i].length; j++) {
          seq.push(this.data[i][j]);
        }
      }
      return seq;
    }

    // static variable. avalable as only one copy among all composition instances.
    Composition.nonOverlappedPattern = [
      [],  // pattern 0
      [2], // pattern 1, doesn't overlap with pattern 2.
      [1], // pattern 2, doesn't overlap with pattern 1.
      [],  // pattern 3
      [],  // pattern 4
      [6], // pattern 5, doesn't overlap with pattern 6.
      [5], // pattern 6, doesn't overlap with pattern 5.
    ];
    // sequence is the order of the pattern card, which does not handle two pattern allowed in same layer situation.
    Composition.createFromSequence = function(sequence) {
      // function to determine if 2 given patterns overlap.
      var allowPatternsInSameLevel = function(patternA, patternB) {
        for (var i=0, len=Composition.nonOverlappedPattern[patternA].length; i<len; i++) {
          if (Composition.nonOverlappedPattern[patternA][i] === parseInt(patternB)) {
            return true;
          }
        }
        return false;
      };
      // layer is an array that contains existing pattern
      var layerAllowsPattern = function(layer, pattern) {
        for (var i=0, len=layer.length; i<len; i++) {
          if (!allowPatternsInSameLevel(layer[i], pattern)) {
            return false;
          }
        }
        return true;
      };
      // end helper functions
    
      var newComposition = new Composition();
      var layer = [];
      for (var i=0, len=sequence.length; i<len; i++) {
        if (layerAllowsPattern(layer, sequence[i])) { // we are still in the same layer.
          layer.push(sequence[i]);
        } else { // two patterns overlapped, push the current layer to composition and use a new layer for the current pattern.
          newComposition.data.push(layer);
          layer = []; // new array instance to prevent browser using the same array and crashes the data.
          layer.push(sequence[i]);
        }
      }
      if (layer.length > 0) newComposition.data.push(layer); // for the last layer
      return newComposition;
    }

    return Composition;
  }) ();
}) ();
