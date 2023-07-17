import process from 'process';
import fs from 'fs';
import path from 'node:path';
import getParseFunction from './parsers.js';
import getFormatFunction from './formaters/index.js';
import getAnswerTree from './builder.js';

const getObjByPath = (filepath) => {
  const obj = fs.readFileSync(filepath, (err) => {
    if (err) throw err;
  });

  const parseFunction = getParseFunction(filepath);

  const jsonedObj = parseFunction(obj);

  return jsonedObj;
};

const normalizePath = (filepath) => {
  if (filepath.startsWith('/')) {
    return filepath;
  }

  return path.resolve(process.cwd(), filepath);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const normalizedPath1 = normalizePath(filepath1);
  const normalizedPath2 = normalizePath(filepath2);

  const obj1 = getObjByPath(normalizedPath1);
  const obj2 = getObjByPath(normalizedPath2);
  const answTree = getAnswerTree(obj1, obj2);
  const answer = getFormatFunction(format)(answTree);

  return answer;
};

export default gendiff;
