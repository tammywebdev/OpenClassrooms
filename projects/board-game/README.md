# Board Game

This is a turn-based browser game built with pure (vanilla) javascript without any dependencies. It also uses Twitter Bootstrap for the layout.

## Getting Started

There's no dependencies, so you won't need to do any installation or building the app. Just open the `index.html` page in any browser to play.

## Game Rules

### Stage

At the beginning of each game, a game map is generated with random conditions. Each box on the game map can be either:
- Empty
- Unavailable (dimmed)

On the map, 4 weapons are placed randomly and can be collected by players who pass through. Each type of weapon has a different damage inflicted. 

There are 2 players who play each turn to compete. The placement of the two players is also randomly on the map when the game loads. Each player carries a default weapon that inflicts 10 points of damage. They are not touching each other at startup (they can not be together).

### Movements

For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn. They obviously can not pass through obstacles directly. If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.

### Fight!
If players cross over adjacent squares (horizontally or vertically), a battle begins. During combat, the game works is as follows:
- Each player plays in turn;
- The player can choose to attack or defend against the next shot;
- The damage depends on the player's weapon;
- If the player chooses to defend themselves, they sustain 50% less damage than normal;

As soon as the life points of a player (initially 100) falls to 0, they lose. A message appears and the game is over.
