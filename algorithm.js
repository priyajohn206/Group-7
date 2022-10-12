let queenPlacedList = [ [3,1]];
let n = 5;
let ansArry;

function generatetable(n) {
    let table = []
    for(let i = 0; i < n; i++) {
        table[i] = new Array(n).fill(true);
    }
    return  table;
}

let table = generatetable(n)
console.log(table);

/*
function algorithm(position){
    console.log(position);
}
*/


function placeQueen(table, postionList){
    for(let i = 0; i < postionList.length; i ++){
        let placement = postionList[i]
        table[placement[1]][placement[0]] = false;
        for(let index = 0; index < n; index ++){
            table[placement[1]][index] = false;
            table[index][placement[0]] = false;
            
            if(placement[1] + index < n ){
            table[placement[1] + index][placement[0] + index] = false;
            table[placement[1] + index][placement[0] - index] = false;

            table[placement[1] - index][placement[0] + index] = false;
            table[placement[1] - index][placement[0] + index] = false;
            }
            
        }
    }
}

console.log(table);
placeQueen(table, queenPlacedList)
