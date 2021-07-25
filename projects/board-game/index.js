class Weapon {
    constructor(x, y, cssWeaponClassName, isFree, damage) {
        this.x = x;
        this.y = y;
        this.cssWeaponClassName = cssWeaponClassName;
        this.isFree = isFree;
        this.damage = damage;
    }
    toggleDrawing() {
        if (this.isFree) {
            const cell = document.querySelector(`#gridCell${this.x}_${this.y}`);
            cell.classList.toggle(this.cssWeaponClassName);
        } else {
            const weaponDiv = document.querySelector(`#gridCell${this.x}_${this.y} .weapon`);
            weaponDiv.classList.toggle(this.cssWeaponClassName);
        }

    }
}

class Player {
    constructor(x, y, cssPlayerClassName) {
        this.x = x;
        this.y = y;
        this.cssPlayerClassName = cssPlayerClassName;
        this.weapon = new Weapon(this.x, this.y, 'weapon-1', false, 10);
        this.life = 100;
    }
    toggleDrawing() {
        const cell = document.querySelector(`#gridCell${this.x}_${this.y}`);
        cell.classList.toggle(`highlight-${this.cssPlayerClassName}`);

        const playerDiv = document.querySelector(`#gridCell${this.x}_${this.y} .player`);
        playerDiv.classList.toggle(this.cssPlayerClassName);

        this.weapon.toggleDrawing();
    }
    moveTo(xx, yy) {
        // Clear current cell.
        this.toggleDrawing();

        // Move the player to a new cell.
        this.x = xx;
        this.y = yy;

        // Move the weapon to a new cell.
        this.weapon.x = xx;
        this.weapon.y = yy;

        // Draw the player with the new weapon.
        this.toggleDrawing();
    }
    togglePaths(map, otherPlayer) {

        // Check the cells on the left side of where the current player is.
        for (let i = 1; i < 4; i++) {
            const leftCellY = this.y - i;
            // Check if the left cell is inbound, not an obstacle and not where the other player is.
            // (The other player is considered as an obstacle)
            if (leftCellY >= 0 && map[this.x][leftCellY] !== 'obstacle' && (otherPlayer.x !== this.x || otherPlayer.y !== leftCellY)) {
                const leftCell = document.querySelector(`#gridCell${this.x}_${leftCellY}`);
                leftCell.classList.toggle(`highlight-${this.cssPlayerClassName}`);

                if (!map[this.x][leftCellY].includes('clickable')) {
                    map[this.x][leftCellY] += ' clickable';
                } else {
                    map[this.x][leftCellY] = map[this.x][leftCellY].replace(' clickable', '');
                }
            } else {
                break;
            }
        }

        // Check the cells on the right side of where the current player is.
        for (let i = 1; i < 4; i++) {
            const rightCellY = this.y + i;
            // Check if right cells are inbound and not obstacles and not the other player.
            if (rightCellY < 10 && map[this.x][rightCellY] !== 'obstacle' && (otherPlayer.x !== this.x || otherPlayer.y !== rightCellY)) {
                const rightCell = document.querySelector(`#gridCell${this.x}_${rightCellY}`);
                rightCell.classList.toggle(`highlight-${this.cssPlayerClassName}`);

                if (!map[this.x][rightCellY].includes('clickable')) {
                    map[this.x][rightCellY] += ' clickable';
                } else {
                    map[this.x][rightCellY] = map[this.x][rightCellY].replace(' clickable', '');
                }
            } else {
                break;
            }
        }

        // Check the cells above where the current player is.
        for (let i = 1; i < 4; i++) {
            const upperCellX = this.x - i;
            // Check if upper cells are inbound and not obstacles and not the other player.
            if (upperCellX >= 0 && map[upperCellX][this.y] !== 'obstacle' && (otherPlayer.x !== upperCellX || otherPlayer.y !== this.y)) {
                const upperCell = document.querySelector(`#gridCell${upperCellX}_${this.y}`);
                upperCell.classList.toggle(`highlight-${this.cssPlayerClassName}`);

                if (!map[upperCellX][this.y].includes('clickable')) {
                    map[upperCellX][this.y] += ' clickable';
                } else {
                    map[upperCellX][this.y] = map[upperCellX][this.y].replace(' clickable', '');
                }
            } else {
                break;
            }
        }

        // Check the cells underneath where the current player is.
        for (let i = 1; i < 4; i++) {
            const lowerCellX = this.x + i;
            // Check if lower cells are inbound and not obstacles and not the other player.
            if (lowerCellX < 10 && map[lowerCellX][this.y] !== 'obstacle' && (otherPlayer.x !== lowerCellX || otherPlayer.y !== this.y)) {
                const lowerCell = document.querySelector(`#gridCell${lowerCellX}_${this.y}`);
                lowerCell.classList.toggle(`highlight-${this.cssPlayerClassName}`);
            } else {
                break;
            }

            if (!map[lowerCellX][this.y].includes('clickable')) {
                map[lowerCellX][this.y] += ' clickable';
            } else {
                map[lowerCellX][this.y] = map[lowerCellX][this.y].replace(' clickable', '');
            }
        }

    }
}

class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        const cell = document.getElementById(`gridCell${this.x}_${this.y}`);
        cell.classList.add('obstacle');
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Game {
    constructor() {
        this.numberOfObstacles = getRandomInt(10);
        this.numberOfWeaponPairs = 3;
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        this.nextPlayer = null;
        this.map = [
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '']
        ];
        this.weapons = [];
    }
    checkWeaponForPicking(destinationX, destinationY) {
        // Check if there is a weapon at the same position with the player.
        for (let weaponIndex = 0; weaponIndex < this.weapons.length; weaponIndex++) {

            const freeWeapon = this.weapons[weaponIndex];
            if (freeWeapon.x === destinationX && freeWeapon.y === destinationY) {

                // Suppose that the current player's weapon is a banana,
                // the freeWeapon is a tomato, the weapon exchange is as follow:

                this.weapons[weaponIndex].toggleDrawing(); // Clear the big tomato.
                this.currentPlayer.toggleDrawing(); // Clear the player and the small banana.

                // Drop a weapon.
                this.weapons[weaponIndex] = this.currentPlayer.weapon; // Put the banana back to the array of weapons.
                this.weapons[weaponIndex].isFree = true; // Set the banana free to turn it into a big banana.
                this.weapons[weaponIndex].toggleDrawing(); // Draw the big banana.

                const divBattlePlayer1Weapon = document.getElementById('divBattlePlayer1Weapon');
                const divPlayer1Weapon = document.getElementById('divPlayer1Weapon');
                const divBattlePlayer2Weapon = document.getElementById('divBattlePlayer2Weapon');
                const divPlayer2Weapon = document.getElementById('divPlayer2Weapon');

                if (this.currentPlayer.cssPlayerClassName === 'player-1') {
                    divBattlePlayer1Weapon.classList.remove(this.currentPlayer.weapon.cssWeaponClassName);
                    divPlayer1Weapon.classList.remove(this.currentPlayer.weapon.cssWeaponClassName);
                } else {
                    divBattlePlayer2Weapon.classList.remove(this.currentPlayer.weapon.cssWeaponClassName);
                    divPlayer2Weapon.classList.remove(this.currentPlayer.weapon.cssWeaponClassName);
                }



                // Pick a weapon
                this.currentPlayer.weapon = freeWeapon; // Put the tomato into the player's hand.
                this.currentPlayer.weapon.isFree = false; // Set the tomato as not free to turn it into a small tomato.
                this.currentPlayer.toggleDrawing(); // Draw the player and the small tomato.


                if (this.currentPlayer.cssPlayerClassName === 'player-1') {
                    divBattlePlayer1Weapon.classList.add(freeWeapon.cssWeaponClassName);
                    divBattlePlayer1Weapon.title = 'Damage: ' + freeWeapon.damage;
                    divPlayer1Weapon.classList.add(freeWeapon.cssWeaponClassName);
                } else {
                    divBattlePlayer2Weapon.classList.add(freeWeapon.cssWeaponClassName);
                    divBattlePlayer2Weapon.title = 'Damage: ' + freeWeapon.damage;
                    divPlayer2Weapon.classList.add(freeWeapon.cssWeaponClassName);
                }




            }
        }
    }
    getEmptyCell() {
        // Return x and y values if the cell is empty.
        let x, y, cellHasValue;
        do {
            x = getRandomInt(10);
            y = getRandomInt(10);
            cellHasValue = this.map[x][y] !== '';
        } while (cellHasValue);
        return [x, y];
    }
    generateMap() {

        let randomX, randomY;

        // Create random obstacles.
        for (let i = 0; i < this.numberOfObstacles; i++) {

            [randomX, randomY] = this.getEmptyCell();

            // Create one obstacle at the empty cell's position.
            const obstacle = new Obstacle(randomX, randomY);
            obstacle.draw();
            this.map[obstacle.x][obstacle.y] = 'obstacle';
        }


        // Create the first player with a default weapon.
        [randomX, randomY] = this.getEmptyCell();
        this.player1 = new Player(randomX, randomY, 'player-1');
        this.player1.toggleDrawing();
        this.map[this.player1.x][this.player1.y] = 'player-1' + ' ' + this.player1.weapon.cssWeaponClassName + ' dmg:' + this.player1.weapon.damage;
        const divBattlePlayer1Weapon = document.getElementById('divBattlePlayer1Weapon');
        divBattlePlayer1Weapon.title = 'Damage: ' + this.player1.weapon.damage;

        // Create the second player with a default weapon.
        // Make sure that the players should not touch.
        let deltaX, deltaY, isTouching;
        do {
            [randomX, randomY] = this.getEmptyCell();
            deltaX = Math.abs(this.player1.x - randomX);
            deltaY = Math.abs(this.player1.y - randomY);
            isTouching = ((deltaX === 0) && (deltaY < 2)) || ((deltaX < 2) && (deltaY === 0));
            console.log(`deltaX: ${deltaX}  deltaY:${deltaY}  isTouching: ${isTouching}`);
        } while (isTouching);

        this.player2 = new Player(randomX, randomY, 'player-2');
        this.player2.toggleDrawing();
        this.map[this.player2.x][this.player2.y] = 'player-2' + ' ' + this.player2.weapon.cssWeaponClassName + ' dmg:' + this.player2.weapon.damage;
        const divBattlePlayer2Weapon = document.getElementById('divBattlePlayer2Weapon');
        divBattlePlayer2Weapon.title = 'Damage: ' + this.player2.weapon.damage;

        // Create random pairs of weapons.
        for (let i = 0; i < this.numberOfWeaponPairs; i++) {

            // The pair of weapons have the same damage.
            let damage = getRandomInt(4) * 10;

            // Create the first weapon of a pair.
            [randomX, randomY] = this.getEmptyCell();

            const cssWeaponClassName = `weapon-${i+2}`;
            let weapon = new Weapon(randomX, randomY, cssWeaponClassName, true, damage);
            weapon.toggleDrawing();
            this.map[weapon.x][weapon.y] = cssWeaponClassName + ' dmg:' + damage;
            this.weapons.push(weapon);

            // Create the second weapon of the pair.
            [randomX, randomY] = this.getEmptyCell();
            weapon = new Weapon(randomX, randomY, cssWeaponClassName, true, damage);
            weapon.toggleDrawing();
            this.map[weapon.x][weapon.y] = cssWeaponClassName + ' dmg:' + damage;
            this.weapons.push(weapon);
        }

        console.log("After generating:", this.map);
        console.log('weapons:', this.weapons);


        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.querySelector(`#gridCell${x}_${y}`);
                cell.addEventListener('click', () => {
                    if (this.map[x][y].includes('clickable')) {

                        // Clear current player's paths.
                        this.currentPlayer.togglePaths(this.map, this.nextPlayer);

                        // Move the player to a new destination.
                        let destinationX, destinationY;
                        const startY = this.currentPlayer.y;

                        if (startY < y) {
                            // Move the current player to the right.
                            const steps = (y - startY);
                            for (let deltaY = 1; deltaY <= steps; deltaY++) {
                                // Move current player to the destination cell.
                                destinationX = this.currentPlayer.x;
                                destinationY = startY + deltaY;
                                this.currentPlayer.moveTo(destinationX, destinationY);
                                // Check if there is a weapon on this path.
                                this.checkWeaponForPicking(destinationX, destinationY);
                            }
                        } else if (y < startY) {
                            // Move the current player to the left.
                            const steps = (startY - y);
                            for (let deltaY = 1; deltaY <= steps; deltaY++) {
                                // this.moveCurrentPlayerTo(this.currentPlayer.x, startY - deltaY);
                                destinationX = this.currentPlayer.x;
                                destinationY = startY - deltaY;
                                this.currentPlayer.moveTo(destinationX, destinationY);
                                // Check if there is a weapon on this path.
                                this.checkWeaponForPicking(destinationX, destinationY);
                            }
                        }

                        const startX = this.currentPlayer.x;
                        if (startX < x) {
                            // Move the current player down.
                            const steps = (x - startX);
                            for (let deltaX = 1; deltaX <= steps; deltaX++) {
                                // this.moveCurrentPlayerTo(startX + deltaX, this.currentPlayer.y);
                                destinationX = startX + deltaX;
                                destinationY = this.currentPlayer.y;
                                this.currentPlayer.moveTo(destinationX, destinationY);
                                // Check if there is a weapon on this path.
                                this.checkWeaponForPicking(destinationX, destinationY);
                            }
                        } else if (x < startX) {
                            // Move the current player up.
                            const steps = (startX - x);
                            for (let deltaX = 1; deltaX <= steps; deltaX++) {
                                // this.moveCurrentPlayerTo(startX - deltaX, this.currentPlayer.y);
                                destinationX = startX - deltaX;
                                destinationY = this.currentPlayer.y;
                                this.currentPlayer.moveTo(destinationX, destinationY);
                                // Check if there is a weapon on this path.
                                this.checkWeaponForPicking(destinationX, destinationY);
                            }
                        }

                        // Check if player 1 is touching player 2
                        const deltaX = Math.abs(this.player1.x - this.player2.x);
                        const deltaY = Math.abs(this.player1.y - this.player2.y);
                        isTouching = ((deltaX === 0) && (deltaY < 2)) || ((deltaX < 2) && (deltaY === 0));
                        if (isTouching) {
                            // Show the modal dialog for battle 
                            const modalBattle = new bootstrap.Modal(document.getElementById('modalBattle'));
                            modalBattle.show();
                        }

                        // Switch between players.
                        if (this.currentPlayer.cssPlayerClassName === 'player-1') {
                            this.currentPlayer = this.player2;
                            this.nextPlayer = this.player1;
                        } else {
                            this.currentPlayer = this.player1;
                            this.nextPlayer = this.player2;
                        }

                        // Highlight the current player's paths.
                        this.currentPlayer.togglePaths(this.map, this.nextPlayer);

                    }
                    console.log('After clicking: ', this.map);
                });
            }

        }

        const buttonGo = document.getElementById('buttonGo');
        buttonGo.addEventListener('click', () => {
            const inputPlayer1Attack = document.getElementById('inputPlayer1Attack');
            const inputPlayer1Defend = document.getElementById('inputPlayer1Defend');
            const inputPlayer2Attack = document.getElementById('inputPlayer2Attack');
            const inputPlayer2Defend = document.getElementById('inputPlayer2Defend');
            // Update player 1 and player 2
            if (inputPlayer2Attack.checked && inputPlayer1Attack.checked) {
                this.player1.life = this.player1.life - this.player2.weapon.damage;
                this.player2.life = this.player2.life - this.player1.weapon.damage;
            }

            if (inputPlayer2Attack.checked && inputPlayer1Defend.checked) {
                this.player1.life = this.player1.life - 0.5 * this.player2.weapon.damage;

            }
            if (inputPlayer2Defend.checked && inputPlayer1Attack.checked) {

                this.player2.life = this.player2.life - 0.5 * this.player1.weapon.damage;
            }

            document.getElementById('spanPlayer1Life').innerText = this.player1.life;
            document.getElementById('spanPlayer2Life').innerText = this.player2.life;

            document.getElementById('spanBattlePlayer1Life').innerText = this.player1.life;
            document.getElementById('spanBattlePlayer2Life').innerText = this.player2.life;

            const textPlayer1Status = document.getElementById('textPlayer1Status');
            const textPlayer2Status = document.getElementById('textPlayer2Status');


            const modalGameOver = new bootstrap.Modal(document.getElementById('modalGameOver'));

            if (this.player1.life < 1) {
                // Update status: player 1 lost
                textPlayer1Status.innerText = "Lost";
                document.getElementById('spanPlayer1Life').innerText = 0;
                textPlayer1Status.parentElement.classList.remove('d-none');
                textPlayer1Status.parentElement.classList.add('bg-danger', 'text-white');

                // Update status: player 2 won
                textPlayer2Status.innerText = "Won";
                textPlayer2Status.parentElement.classList.remove('d-none');
                textPlayer2Status.parentElement.classList.add('bg-success', 'text-white');
                // Clear currentPlayer path
                this.currentPlayer.togglePaths(this.map, this.nextPlayer);

                modalGameOver.show();

            }

            if (this.player2.life < 1) {
                // Update status: player 1 won
                textPlayer1Status.innerText = "Won";
                textPlayer1Status.parentElement.classList.remove('d-none');
                textPlayer1Status.parentElement.classList.add('bg-success', 'text-white');

                // Update status: player 2 lost
                document.getElementById('spanPlayer2Life').innerText = 0;
                textPlayer2Status.innerText = "Lost";
                textPlayer2Status.parentElement.classList.remove('d-none');
                textPlayer2Status.parentElement.classList.add('bg-danger', 'text-white');

                // Clear currentPlayer path
                this.currentPlayer.togglePaths(this.map, this.nextPlayer);

                modalGameOver.show();
            }
        });
    }
    start() {

        this.currentPlayer = this.player1;
        this.nextPlayer = this.player2;

        // Highlight 4 possible paths.
        this.currentPlayer.togglePaths(this.map, this.nextPlayer);
    }
}

const game = new Game();
game.generateMap();
game.start();