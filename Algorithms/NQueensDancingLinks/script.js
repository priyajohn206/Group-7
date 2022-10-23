nSquares = 13;

class listNode {

    constructor(value) {
        this.up = this;
        this.down = this;
        this.left = this;
        this.right = this;
        this.value = value;
    }

    insertRight(node) {
        node.right = this;
        node.left = this.left;
        this.left.right = node;
        this.left = node;
    }

    updateValue() {
        this.value = this.left.value + 1;
    }

    insertDown(node) {
        node.down = this;
        node.up = this.up;
        this.up.down = node;
        this.up = node;
    }

    removeNode() {
        this.down.up = this.up;
        this.up.down = this.down;
        this.left.right = this.right;
        this.right.left = this.left;
    }

    reInsertNode() {
        this.down.up = this;
        this.up.down = this;
        this.left.right = this;
        this.right.left = this;
    }
}
listNode.currentValue = 0;

let rootNode = new listNode(-1);

for(let i = 0; i < nSquares; i++) {
    newNode = new listNode(i);
    rootNode.insertRight(newNode);
    newNode.updateValue();
}

for(let i = 0; i < nSquares; i++) {
    newNode = new listNode(i + 100);
    rootNode.insertRight(newNode);
    newNode.updateValue();
}

for(let n = 2; n < 4; n++) {
    for(let i = 0; i < nSquares * 2 - 1; i++) {
        /*if (i === 0 || i === nSquares * 2 - 2) {
            continue;
        }*/
        newNode = new listNode(i + 100 * n);
        rootNode.insertRight(newNode);
        newNode.updateValue();
    }
}

for(let i = 0; i < nSquares; i++) {
    for (let j = 0; j < nSquares; j++) {
        let currentNode = rootNode.right;
        let rightMostNode;
        for (let n = 0; n < nSquares * 6 - 2; n++) { //change to -6 to remove redundancy
            if (currentNode.value === i) {
                newNode = new listNode([j, i]);
                currentNode.insertDown(newNode);
                rightMostNode = newNode
            }
            if (currentNode.value === nSquares + j) {
                newNode = new listNode([j, i]);
                currentNode.insertDown(newNode);
                rightMostNode.insertRight(newNode);
                rightMostNode = newNode
            }
            if (currentNode.value === nSquares * 2 + i + j) { 
                newNode = new listNode([j, i]);
                currentNode.insertDown(newNode);
                rightMostNode.insertRight(newNode);
                rightMostNode = newNode
            }
            if (currentNode.value === nSquares * 4 - 1 + nSquares - 1 - i + j) {
                newNode = new listNode([j, i]);
                currentNode.insertDown(newNode);
                rightMostNode.insertRight(newNode);
            }
            currentNode = currentNode.right;
        }
    }
}

function solve() {
    if (rootNode.right.value >= nSquares * 2) {
        solutions.push(currentPositions);
        return;
    }
    else if (rootNode.right === rootNode.right.down) {
        return;
    }

    let currentColumn = rootNode.right;
    let currentRow = currentColumn.down;
    let removedNodes = []

    do {

        currentPositions.push(currentRow.value);
        //console.log(currentPositions);
        //console.log(currentRow.value);

        while (currentRow != currentRow.right) {
            columnInRow = currentRow.right;
            while (columnInRow != columnInRow.down) {
                while (columnInRow.up.value.length != undefined) {
                    removedNodes.push(columnInRow.up.right);
                    columnInRow.up.right.removeNode();
                }
                while (columnInRow.down.value.length != undefined) {
                    removedNodes.push(columnInRow.down.right);
                    columnInRow.down.right.removeNode();
                }
                removedNodes.push(columnInRow.down);
                columnInRow.down.removeNode();
            }
            removedNodes.push(columnInRow);
            columnInRow.removeNode();
        }
        while (currentRow != currentRow.down) {
            removedNodes.push(currentRow.down);
            currentRow.down.removeNode();
        }
        removedNodes.push(currentRow);
        currentRow.removeNode();

        solve();

        while (removedNodes.length > 0) {
            nodesReinserted++;
            removedNodes.pop().reInsertNode();
        }

        currentPositions.pop();
        currentRow = currentRow.down;

    } while (currentRow.value != currentColumn.value);

}

currentPositions = [];
solutions = [];
nodesReinserted = 0;
solve();
console.log(solutions);
console.log(nodesReinserted);

/*let currentNode = rootNode.right;
let downNode;
do {
    console.log(currentNode.value);
    downNode = currentNode.down;
    do {
        console.log(downNode.value)
        downNode = downNode.down;
    } while (downNode.value != currentNode.value);
    currentNode = currentNode.right;
} while (currentNode.value != -1)*/

function solve2() {
    let currentNode = rootNode.right;
    let downNode;
    do {
        console.log(currentNode.value);
        downNode = currentNode.down;
        do {
            console.log(downNode.value)
            downNode = downNode.down;
        } while (downNode.value != currentNode.value);
        currentNode = currentNode.right;
    } while (currentNode.value != -1)
}

console.log("done");
