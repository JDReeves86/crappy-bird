let startY = 50;
let startX = 10;
let score = 0;
let interval = 0;
const banner = document.getElementById('banner');
const counter = document.getElementById('counter');
const player = document.getElementById('player');

player.setAttribute('style', `left:${startX}vw; top:${startY}vh`);

const enemy = document.getElementById('enemy');

enemy.setAttribute('style', `left:${90}vw; ${setEnemyTop()}; height: ${setEnemyHeight()}%;`);
enemy.setAttribute('data-int', 0);

setInterval(() => {
    counter.innerText = `score: ${tallyScore(score)}`
}, 75);

let playerPosition = {
    x: (player.getBoundingClientRect().x) + ((player.getBoundingClientRect().width) / 2),
    y: (player.getBoundingClientRect().y) + ((player.getBoundingClientRect().height) / 2)
};

let enemyMap = {}

// key mapper
let keysPressed = {}
window.addEventListener('keydown', (ev) => {
    keysPressed[ev.key] = true
    playerPosition = {
        x: Math.floor(player.getBoundingClientRect().x),
        y: Math.floor(player.getBoundingClientRect().y)
    }
    if (keysPressed.ArrowUp == true) {player.setAttribute('style', `left:${startX}%; top:${up()}%`)};
    // if (keysPressed.ArrowDown == true) {player.setAttribute('style', `left:${startX}vw; top:${down()}vh`)}
    if (keysPressed.ArrowLeft == true) {player.setAttribute('style', `left:${left()}%; top:${startY}%`)};
    if (keysPressed.ArrowRight == true) {player.setAttribute('style', `left:${right()}%; top:${startY}%`)}
});

window.addEventListener('keyup', (ev) => {
    keysPressed[ev.key] = false;
    keysPressed.ArrowUp = false;
});

setInterval(() => {
    if (keysPressed.ArrowUp == false) {player.setAttribute('style', `left:${startX}vw; top:${down()}vh`)};
}, 5);

setInterval(() => {
    glideEnemies(enemy)
    mapEnemyposition();
    collisionChecker();
}, 10);

setInterval(() => {
    interval++
    const newEnemy = document.createElement('div');
    newEnemy.setAttribute('style', `background-color: red; left:${90}vw; ${setEnemyTop()}; height: ${setEnemyHeight()}vh;`);
    newEnemy.setAttribute('id', 'enemy');
    newEnemy.setAttribute('data-int', `${interval}`)
    document.body.appendChild(newEnemy);

    setInterval(() => {
        glideEnemies(newEnemy)
    }, 10)
}, 4000);
