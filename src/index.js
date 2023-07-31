import process from 'process';
import fs from 'fs';
import path from 'node:path';
import getJsonedObj from './parsers.js';
import formatTree from './formaters/index.js';
import getUnformattedTree from './builder.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const normalizedPath1 = path.resolve(process.cwd(), filepath1);
  const normalizedPath2 = path.resolve(process.cwd(), filepath2);

  const format1 = path.extname(normalizedPath1);
  const format2 = path.extname(normalizedPath2);

  const obj1 = fs.readFileSync(normalizedPath1);
  const obj2 = fs.readFileSync(normalizedPath2);
  const jsonedObj1 = getJsonedObj(format1, obj1);
  const jsonedObj2 = getJsonedObj(format2, obj2);

  const unFormattedTree = getUnformattedTree(jsonedObj1, jsonedObj2);
  const formattedTree = formatTree(format, unFormattedTree);

  return formattedTree;
};

export default gendiff;
