function glideEnemies(a) {
    let eX = getComputedStyle(a).left.slice(0, -2);
    let eY = Number(getComputedStyle(a).height.slice(0, -2));
    let id = a.getAttribute('data-int');
    if (eX < 0) {
        a.remove();
        delete enemyMap[id]
    }
    eX = eX -= 1;
    a.setAttribute('style', `left:${eX}px; ${topOrBottom(a)}; height:${eY}px;`);
};

function topOrBottom(el) {
    let checkEl = Number(getComputedStyle(el).top.slice(0, -2))
    if(checkEl < 0) {
        topValue = getComputedStyle(el).top;
        return `top:${topValue}`
    }
    else {
        bottomValue = getComputedStyle(el).bottom;
        return `bottom:${bottomValue}`
    }
};

function setEnemyHeight() {
    return Math.floor(Math.random() * (90 - 40) + 40)
};

function setEnemyTop() {
    let top = Math.floor(Math.random() * 100)
    return top > 50 ? 'bottom: -1vh' : 'top: -1vh'
};

function up() {
    if (startY < 0) {
        startY = 0.1
        // startY = 100
    };
    startY = (startY - 1);
    return(startY);
};

function down() {
    if (startY > 100) {
        startY = 99.9
        // startY = 0
    };
    startY = (startY + 0.1);
    return(startY);
};

function left() {
    if (startX < 0) {
        startX = 1
    };
    startX = (startX - 1);
    return startX;
};

function right() {
    if (startX > 100) {
        startX = 99
    };
    startX = (startX + 1);
    return startX;
};

function subtractLife() {
    banner.innerText = 'GAME OVER!'
    setTimeout(() => {
        location.reload()
    }, 1000)  
};

function collisionChecker() {
    for (const el in enemyMap) {
        if (playerPosition.x == enemyMap[el].left && 
            playerPosition.y > enemyMap[el].top && 
            playerPosition.y < enemyMap[el].bottom) {
            subtractLife()
        }
    }

};

function tallyScore() {
    return score += 1
};

function mapEnemyposition() {
    const enemyList = Array.from(document.querySelectorAll('#enemy'));
    enemyList.forEach((el) => {
        const id = el.getAttribute('data-int')
        const top = el.getBoundingClientRect().top;
        const bottom = el.getBoundingClientRect().bottom;
        const left = el.getBoundingClientRect().left;
        const right = el.getBoundingClientRect().right;
        enemyMap[id] = new Enemy(id, top, bottom, left, right)
    })
};