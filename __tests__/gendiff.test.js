import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('correct flow json', () => {
  const filepath1 = getFixturePath('deep1.json');
  const filepath2 = getFixturePath('deep2.json');
  const expectedString = readFile('expected_deep.txt');
  expect(gendiff(filepath1, filepath2)).toEqual(expectedString);

  const YMLfilepath1 = getFixturePath('deep1.yml');
  const YMLfilepath2 = getFixturePath('deep2.yaml');
  expect(gendiff(YMLfilepath1, YMLfilepath2)).toEqual(expectedString);
});
