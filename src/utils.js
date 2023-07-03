import process from 'process';
import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);

  const unionedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionedKeys);

  return sortedKeys;
};

const getObjByPath = (filepath) => {
  const obj = fs.readFileSync(filepath, (err) => {
    if (err) throw err;
  });
  const jsonedObj = JSON.parse(obj);

  return jsonedObj;
};

const getStringedAnswer = (obj1, obj2) => {
  const keys = getSortedKeys(obj1, obj2);

  const arrayedAnsw = keys.map((key) => {
    if (Object.hasOwn(obj1, key)) {
      if (Object.hasOwn(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          return `  ${key}: ${obj1[key]}`;
        }

        return `- ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
      }
    } else {
      return `+ ${key}: ${obj2[key]}`;
    }

    return `- ${key}: ${obj1[key]}`;
  });

  let stringedAnsw = '{\n';
  for (let i = 0; i < arrayedAnsw.length; i += 1) {
    stringedAnsw = `${stringedAnsw}  ${arrayedAnsw[i]}\n`;
  }
  stringedAnsw = `${stringedAnsw}}`;

  return stringedAnsw;
};

const normalizePath = (filepath) => {
  if (filepath.startsWith('/')) {
    return filepath;
  }

  return path.resolve(process.cwd(), filepath);
};

const gendiff = (filepath1, filepath2) => {
  const normalizedPath1 = normalizePath(filepath1);
  const normalizedPath2 = normalizePath(filepath2);

  const obj1 = getObjByPath(normalizedPath1);
  const obj2 = getObjByPath(normalizedPath2);
  const answer = getStringedAnswer(obj1, obj2);

  return answer;
};

export default gendiff;
