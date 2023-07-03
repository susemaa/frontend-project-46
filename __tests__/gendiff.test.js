import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('correct flow', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  console.log(filepath1, filepath2);
  const expectedString = readFile('expected.txt');

  expect(gendiff(filepath1, filepath2)).toEqual(expectedString);
});
