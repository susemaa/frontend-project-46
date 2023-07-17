import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected_deep.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJSON = readFile('expected_json.txt');

test('json every format', () => {
  const filepath1 = getFixturePath('deep1.json');
  const filepath2 = getFixturePath('deep2.json');
  expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
});

test('yaml stylish', () => {
  const filepath1 = getFixturePath('deep1.yml');
  const filepath2 = getFixturePath('deep2.yaml');
  expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
});
