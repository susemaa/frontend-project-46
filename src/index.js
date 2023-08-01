import process from 'process';
import fs from 'fs';
import path from 'node:path';
import getObjFromData from './parsers.js';
import formatTree from './formaters/index.js';
import buildTree from './builder.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const extension1 = path.extname(absolutePath1);
  const extension2 = path.extname(absolutePath2);

  const data1 = fs.readFileSync(absolutePath1);
  const data2 = fs.readFileSync(absolutePath2);
  const obj1 = getObjFromData(extension1, data1);
  const obj2 = getObjFromData(extension2, data2);

  const rawTree = buildTree(obj1, obj2);
  const styledTree = formatTree(format, rawTree);

  return styledTree;
};

export default gendiff;
