//This is the edit to publish to github from github desktop
//This is a test
//global variables
//testBranch
const boardSize = 10;
const maxTurns = 40;
var game1 = new Game();

//Functions Start
function playGame() {
   //this is the main flow of the game
   explainRules();
   var mode = getPlayerNumber();
   
   if (mode === 1) {
      //mode is single player
   } else if (mode === 2) {
      //mode is 2 player

      //place ships
      for (var i = 0; i < 2; i++) {
         placeShips(i);
      }

      //turns
      for (var turnCount = 0; turnCount < maxTurns; turnCount++) {
         if (turn(0) === true) {
            //jump to the victory display for player 0
            sunkAllWin(0);
         } else if (turn(1) === true) {
            //jump to the victory display for player 1
            sunkAllWin(1);
         } else {
            //new round of turns
         }
      }
   }
}
//Functions End
function explainRules() {
   //display a div that says
   //This is a game of battle ship
   //Each player has 5 ships of various sizes that they place on the board on their first turn
   //Ships cannot occupy the same tile, ships cannot hang off the grid, ships can be next to eachother
   //Starting on a players second turn they get 1 shot at the enemies ship
   //if they hit the enemies ship then the tile will show a hit
   //if they miss the enemies ship then the tile will show a miss
   //if all tiles of a enemies ship are hit the ship is sunk
}

function getPlayerNumber() {
   //display 2 buttons 1 player and 2 player
   
   //todo somehow wait for the buttons to be hit the procede with the values associated with
   //the buttons
   //return player number as a integer
}
function placeShips(x) {
   //confirm private board
   //display player x's board

   //player x places ships >>>>Hard Part is waiting for user clicks
   for (var i = 0; i < 5; i++) {
      var ship = game1.shipsInv.playersInv[x][i];
      console.log(ship.name);
      console.log(ship.size);
      //ask for the (x,y) of bow and (x,y) of stern
      var xBowCoord = prompt("your ship is" + ship.size + " units long what x coordinate would you like to place the bow at?");
      var yBowCoord = prompt("your ship is" + ship.size + " units long what y coordinate would you like to place the bow at?");
      var xSternCoord = prompt("your ship is" + ship.size + " units long what y coordinate would you like to place the stern at?");
      var ySternCoord = prompt("your ship is" + ship.size + " units long what y coordinate would you like to place the stern at?");
      
      //place the ships sections on the grid
      if (xBowCoord === xSternCoord) {
         //then traverse the y coordinate when placing
         pathOffset = ySternCoord - yBowCoord;
         for (var i = yBowCoord; i < ship.size; i++) {
            
         }
      } else if (yBowCoord === ySternCoord) {
         //then traverse the x coordinate when placing
      }

   }

   //clear player x board
}

//x is the player number of the current person shooting
function turn(x) {
   //confirm private board
   //display player 0's board (home board) with ships
   //display player 1's board (guess board) without ships but with misses/hits
   //Prompt to guess >> hard part is waiting for click
   //Get guess coordinate
   var xCoord = 0;
   var yCoord = 0;
   //update player 1's board (guess board) with coordinate
   var shotStatus = updateBoard(xCoord, yCoord, x);
   if (shotStatus === "hit") {
      //check if all player 1's ships are sunk
   } else {
      //if no go to next player
      return false;
   } 
}

//player is the player number of the board that got shot at
function updateBoard(xCoord, yCoord, player) {
   var shotStatus;
   var coordSlot = game1.grid[xCoord][yCoord].players[player];
   //if (xCoord, yCoord) has a ship in it
   if (coordSlot.containsShip === true) {
      //then the slot contains a ship
      //if the slot has been sunk
      if (coordSlot.sunk === true || coordSlot.hit === true) {
         //then this slot was allready shot at
         shotStatus = "invalid";
      } else {
         //then the slot contains a ship and it has not been shot at before
         shotStatus = "hit";
      }
   } else {
      //then the slot does not contain a ship
      shotStatus = "miss";
   }
   if (shotStatus === "miss") {
      coordSlot.missed = true;
      coordSlot.hit = false;
      coordSlot.sunk = false; 
   } else if (shotStatus === "hit") {
      coordSlot.hit = true;
      //todo find a way to increment each ship types sectionsHit field
   }
   return shotStatus;
}
function allSunk(player) {
   //this is a 5 slot array with ship objects in it
   var ship;
   for (var i = 0; i < 5; i++) {
      ship = game1.shipsInv.playersInv[player][i];
      if (ship.sectionsHit >= ship.size) {

      }
   }
   

}
function sunkAllWin(x) {
   //game is over and player x wins
}


//Objects section
class Game {
   constructor() {
      this.grid = new Array(boardSize);
      this.shipsInv = new ShipInventory();

      for (var row = 0; row < boardSize; row++) {
         grid[row] = new Array(boardSize);
         for (var col = 0; col < boardSize; col++) {
            grid[row][col] = new Slot();
         }
      }
   }
}
class Slot {
   constructor() {
      this.players = new Array(2);
      this.players[0] = new Player();
      this.player[1] = new Player();
   }
}
class Player {
   constructor() {
      this.hit = false;
      this.missed = false;
      this.containsShip = false;
      this.shipType = -1;
      this.sunk = false;
   }
}
class ShipInventory {
   constructor() {
      this. playersInv = new Array(2);

      this.playersInv[0] = new Array(5); 
      this.playersInv[1] = new Array(5);
      for (var player = 0; player < 2; player++) {
         for (var shipNum = 0; shipNum < 5; shipNum++) {
            this.playersInv[player][shipNum] = new Ship(shipNum);
         }
      }
   }
}
class Ship {
   constructor(shipNum) {
      if (shipNum === 0) {
         this.name = "carrier";
         this.size = 5;
      } else if (shipNum === 1) {
         this.name = "battleship";
         this.size = 4;
      } else if (shipNum === 2) {
         this.name = "destroyer";
         this.size = 3;
      } else if (shipNum === 3) {
         //submarine
         this.name = "submarine";
         this.size = 3;
      } else if (shipNum === 4) {
         this.name = "patrol boat";
         this.size = 2;
      }
      this.shipNum = shipNum;
      this.sectionsHit = 0;
   }
}
//End Objects Section