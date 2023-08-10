const fs = require('fs');
const path = require('path');

async function fetchRandomTruthsAndDares(maxValues, onlyTruth = false, onlyDare = false) {
  try {
    const truthFilePath = path.join(__dirname.replace("/functions", ""), 'data', 'truth.txt');
    const dareFilePath = path.join(__dirname.replace("/functions", ""), 'data', 'dare.txt');
    
    let allTruthsAndDares = [];

    if (!onlyDare) {
      const truthData = fs.readFileSync(truthFilePath, 'utf-8');
      const truths = truthData.split('\n').map(line => line.trim()).filter(line => line !== '');
      allTruthsAndDares = allTruthsAndDares.concat(truths);
    }

    if (!onlyTruth) {
      const dareData = fs.readFileSync(dareFilePath, 'utf-8');
      const dares = dareData.split('\n').map(line => line.trim()).filter(line => line !== '');
      allTruthsAndDares = allTruthsAndDares.concat(dares);
    }

    if (!allTruthsAndDares.length) {
      throw new Error('No truths and dares found in the files.');
    }

    if (maxValues > allTruthsAndDares.length) {
      throw new Error(`Max values (${maxValues}) exceed the number of available truths and dares (${allTruthsAndDares.length}).`);
    }

    const shuffledTruthsAndDares = shuffleArray(allTruthsAndDares);
    const selectedTruthsAndDares = shuffledTruthsAndDares.slice(0, maxValues);
    return selectedTruthsAndDares;
  } catch (error) {
    throw new Error('Error reading the files: ' + error.message);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = fetchRandomTruthsAndDares;