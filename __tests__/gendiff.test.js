import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('correct flow json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expectedString = readFile('expected.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(expectedString);

  const ymlFilepath1 = getFixturePath('file1.yml');
  const ymlFilepath2 = getFixturePath('file2.yaml');
  expect(gendiff(ymlFilepath1, ymlFilepath2)).toEqual(expectedString);

  const deepFilepath1 = getFixturePath('deep1.json');
  const deepFilepath2 = getFixturePath('deep2.json');
  const deepExpectedString = readFile('expected_deep.txt');
  expect(gendiff(deepFilepath1, deepFilepath2)).toEqual(deepExpectedString);
});
