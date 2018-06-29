# project_1-the_game

TEXAS HOLD 'EM

2 players:
  1 user
  1 cpu

Round:
ante bet collected
each player is given 2 cards
  round of betting
three community cards dealt "the flop"
  round of betting
one community card dealt "the turn"
  round of betting
one community card dealt "the river"
  round of betting
showdown occurs if both players still active
if either player folds during any round of betting, round ends immediately

at showdown, 5 cards automatically chosen from 7 possible cards to make the highest hand type possible. 
computer will:
  organize the 5 cards
    matching values first
    followed by highest to lowest values
  compare the hands and declare a winner
winner receives the pot (consists of all bets made during the round)

hand types in order:
  royal flush
  straight flush
  4 of a kind
  full house
  flush
  straight
  3 of a kind
  two pair
  pair
  high card

a higher hand type beats any lower hand type.
if both players have same hand type, the computer iterates over the hands comparing each card one at a time looking for tie breaker.

each card represented by two characters:
  a value [A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2]
  a suit [C, S, H, D]
  example: AH = ace of hearts, TD = ten of diamonds

