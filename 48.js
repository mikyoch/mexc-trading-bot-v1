function move2048(arr, direction, addRandom = true) {
  const result = [];

  // Copy the input arr to the result arr
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }

  // Perform the move
  switch (direction) {
    case 'up':
      for (let j = 0; j < result[0].length; j++) {
        let i = 0;
        let k = 0;
        while (i < result.length && k < result.length) {
          if (result[k][j] === 0) {
            k++;
          } else {
            if (i !== k) {
              result[i][j] = result[k][j];
              result[k][j] = 0;
            }
            if (i > 0 && result[i - 1][j] === result[i][j]) {
              result[i - 1][j] *= 2;
              result[i][j] = 0;
            } else {
              i++;
            }
            k++;
          }
        }
      }
      break;
    case 'down':
      for (let j = 0; j < result[0].length; j++) {
        let i = result.length - 1;
        let k = result.length - 1;
        while (i >= 0 && k >= 0) {
          if (result[k][j] === 0) {
            k--;
          } else {
            if (i !== k) {
              result[i][j] = result[k][j];
              result[k][j] = 0;
            }
            if (i < result.length - 1 && result[i + 1][j] === result[i][j]) {
              result[i + 1][j] *= 2;
              result[i][j] = 0;
            } else {
              i--;
            }
            k--;
          }
        }
      }
      break;
    case 'left':
      for (let i = 0; i < result.length; i++) {
        let j = 0;
        let k = 0;
        while (j < result[0].length && k < result[0].length) {
          if (result[i][k] === 0) {
            k++;
          } else {
            if (j !== k) {
              result[i][j] = result[i][k];
              result[i][k] = 0;
            }
            if (j > 0 && result[i][j - 1] === result[i][j]) {
              result[i][j - 1] *= 2;
              result[i][j] = 0;
            } else {
              j++;
            }
            k++;
          }
        }
      }
      break;
    case 'right':
      for (let i = 0; i < result.length; i++) {
        let j = result[0].length - 1;
        let k = result[0].length - 1;
        while (j >= 0 && k >= 0) {
          if (result[i][k] === 0) {
            k--;
          } else {
            if (j !== k) {
              result[i][j] = result[i][k];
              result[i][k] = 0;
            }
            if (j < result[0].length - 1 && result[i][j + 1] === result[i][j]) {
              result[i][j + 1] *= 2;
              result[i][j] = 0;
            } else {
              j--;
            }
            k--;
          }
        }
      }
      break;
    default:
      throw new Error('Invalid direction');
  }

  // Generate a random number and place it on the board if the board has changed
  if (!matrixEquals(arr, result) && addRandom) {
    placeRandomNumber(result);
  }

  return result;
}

function matrixEquals(matrix1, matrix2) {
  // Check if the matrices are the same size
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    return false;
  }

  // Check if the corresponding elements are the same
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[0].length; j++) {
      if (matrix1[i][j] !== matrix2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function placeRandomNumber(arr) {
  const emptyTiles = [];

  // Find all the empty tiles
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === 0) {
        emptyTiles.push([i, j]);
      }
    }
  }

  // Choose a random empty tile and place a 2 or 4 on it
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const [i, j] = emptyTiles[randomIndex];
  arr[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function isFull(arr) {
  for (let i = 0; i < 4; i++) {
    if (arr[i][0] || arr[i][1] || arr[i][2] || arr[i][3]) {
      for (let j = i; j < 4; j++)
        for (let k = 0; k < 4; k++)
          if (!arr[j][k]) return false;
      for (let j = 0; j < i; j++)
        for (let k = 0; k < 4; k++)
          if (arr[j][k]) return false;
      break;
    }
  }
  return true;
}

function canUp(arr) {
  return true;
  for (let i = 0; i < 4; i++)
    if (!arr[i][0] || !arr[i][1] || !arr[i][2]) return false;
  return true;
}

function emptyCount(arr) {
  let res = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) res += !arr[i][j];
  return res;
}

function getMaxTile(mat) {
  return Math.max(...mat[0], ...mat[1], ...mat[2], ...mat[3]);
}

function getMatrixScore(arr) { // I value corners
  let score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (arr[i][j]) score += (Math.log2(arr[i][j]) - 1) * arr[i][j];
    }
  }
  return score;
};

function getStatusScore(arr) { // I value corners
  let diff = 0;
  let sum = 0;
  const max_tile = getMaxTile(arr);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      sum += arr[i][j];
      if (j != 3) {
        // if (i == 2) {
        //   if (max_tile == arr[3][0]) diff += Math.max(0, arr[i][j] - arr[i][j + 1]);
        //   else diff += Math.max(0, arr[i][j + 1] - arr[i][j]);
        // }
        // else diff += Math.abs(arr[i][j] - arr[i][j + 1]);
        if (i == 3) diff += Math.max(0, arr[i][j] - arr[i][j + 1]);
        else if (i == 2) diff += Math.max(0, arr[i][j + 1] - arr[i][j]);
        else diff += Math.abs(arr[i][j] - arr[i][j + 1]);
      }
      if (i != 3) diff += Math.max(0, arr[i][j] - arr[i + 1][j]);
      // if (i != 3) diff += Math.abs(arr[i][j] - arr[i + 1][j]);
      // if (i) diff += Math.abs(arr[i][j] - arr[i - 1][j]);
      // if (i == 3 && j) diff += Math.abs(arr[i][j] - arr[i][j - 1]);
    }
  }
  return (sum * 4 - diff) * 2;
};

let MAX_DEPTH = 3;
let directions = ["up", "right", "down", "left"];

const func = (arr, depth) => {
  if (depth == MAX_DEPTH) return {
    scr: getStatusScore(arr),
    dir: -1,
  };
  let dir = 0, best = -1e100;
  for (let i = 0; i < 4; i++) {
    let mat = move2048(arr, directions[i], false);
    if (matrixEquals(arr, mat)) continue;
    let emptyCount = 0, sum = 0;
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++) {
        if (!mat[j][k]) {
          emptyCount++;
          mat[j][k] = 2;
          sum += func(mat, depth + 1).scr * 0.9;
          mat[j][k] = 4;
          sum += func(mat, depth + 1).scr * 0.1;
          mat[j][k] = 0;
        }
      }
    if (emptyCount) {
      sum /= emptyCount;
    }
    let base = getMatrixScore(mat);
    if (base + sum > best) {
      best = base + sum;
      dir = i;
    }
  }
  return {
    scr: best,
    dir,
  };
};

function run() {
  let emptyCount = 0;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (!arr[i][j]) emptyCount++;
  let dir = func(arr, 0).dir;
  let ret = move2048(arr, directions[dir]);
  if (Math.random() > 0.9) {
    for (let i = 0; i < 4; i++) console.log(arr[i]);
    console.log("--------------\n");
  }
  if (!matrixEquals(arr, ret)) {
    setTimeout(() => {
      arr = ret;
      run();
    }, 30);
  } else {
    for (let i = 0; i < 4; i++) console.log(arr[i]);
    console.log("--------------\n");
  }
}

let arr = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [4096, 2, 4, 0],
]
placeRandomNumber(arr);
placeRandomNumber(arr);

run();
