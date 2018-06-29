console.log("js active");


// create a deck of 52 cards
const deck = () => {
  // keep suits and values separate so they can be referenced later
  this.suit = ['S', 'H', 'D', 'C']
  this.value = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  // this .cards array will hold the completed deck
  this.cards = []
  
  // nested loop to combine the two arrays into all 52 cards 
  for ( i = 0; i < this.suit.length; i++) {
    for ( j = 0; j < this.value.length; j++) {
      this.cards.push( this.suit[i] + this.value[j] )
    }
  }
}

const player = {
  this.playerHand: []
  this.playerChips: 
  this.bet: 
}















const gameObject = {

    const handType = {
      straightFlush: [];
        // card 1, card 2, card 3, card 4, card 5 all consecutive .value indexes
        // card 1, card 2, card 3, card 4, card 5 all same suit
        // tie break: card 1 comparison
      
      fourOfAKind: [];
        // card 1, card 2, card 3, card 4, all same value 
        // card 5 negligibile. 
        // tie break: card 1 comparison 
      
      fullHouse: [];
        // card 1, card 2, card 3 all same value. card 4, card 5 same value.
        // tie break: card 1 comparison, then card 4 comparison 

      flush: [];
        // card 1, card 2, card 3, card 4, card 5 all same suit index. 
        // tie break: compare all cards 1-5 in order.
      
      straight: [];
        // card 1, card 2, card 3, card 4, card 5 all consecutive .value index
        // tie break: card 1 comparison 
      
      threeOfAKind: [];
        // card 1, card 2, card 3 all same value. card 4, card 5 different values from the first 3 and each other.
        // tie break: card 1 comparison, then card 4 comparison, then card 5 comparison
      
      twoPair: [];
        // card 1, card 2 matching .value index. card 3, card 4 matching .value index different from first two. card 5 not the same value index as either set.
        // tie break: card 1 comparison, then card 3 comparison, then card 5 comparison
      
      pair: [];
        // card 1, card 2 matching .value index. card 3 different value index. card 4 different from set and card 3. card 5 different value index from rest of hand.
        // tie break: card 1 comparison, then card 3 comparison, then card 4 comparison, then card 5 comparison.
      
      highCard: [];
        // no value index matches, at least two suits.  
        // tie break: compare all cards 1-5 in order.                                  
      }



      











    }

































