
// returns [1000,3000,2000], a list of total calories of each elf
function parseInput(input:string):number[] {
  const elves = [0];
  input.split("\n").forEach((line:string) => {
    if (line !== "") {
      elves[elves.length-1] += parseInt(line);
    } else {
      elves.push(0);
    }
  })
  return elves;
}

function sumArr(arr:number[]):number {
  return arr.reduce((acc, item) => acc + item, 0);
}

export function part1(input:string):number {
  const elves = parseInput(input);  
  return Math.max(...elves);
}

function sortDesc (a:number,b:number) {return b-a;}

export function part2(input:string):number {
  const elves = parseInput(input);
  const top3 =  elves.slice(0).sort(sortDesc).slice(0,3);
  return sumArr(top3);
}