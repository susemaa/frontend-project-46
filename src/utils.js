import process from 'process';
import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';
import getParseFunction from './parsers.js';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unionedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionedKeys);

  return sortedKeys;
};

const getObjByPath = (filepath) => {
  const obj = fs.readFileSync(filepath, (err) => {
    if (err) throw err;
  });

  const parseFunction = getParseFunction(filepath);

  const jsonedObj = parseFunction(obj);

  return jsonedObj;
};

const becomeStylish = (tree) => {
  const space = ' ';
  const spacesAmount = 4;
  const makeDeep = (depth) => space.repeat(spacesAmount * depth - 2);
  const makeDeepBracket = (depth) => space.repeat(spacesAmount * depth - 4);
  const stringify = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const entries = Object.entries(data);
    const lines = entries.map(([key, value]) => `${makeDeep(depth)}  ${key}: ${stringify(value, depth + 1)}`);

    return ['{', ...lines, `${makeDeepBracket(depth)}}`].join('\n');
  };

  const iter = (node, depth = 1) => {
    const arrOfStr = node.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${makeDeep(depth)}  ${item.key}: ${iter(item.children, depth + 1)}`;
        }
        case 'added': {
          return `${makeDeep(depth)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        }
        case 'deleted': {
          return `${makeDeep(depth)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        }
        case 'changed': {
          return `${makeDeep(depth)}- ${item.key}: ${stringify(item.valueBefore, depth + 1)}\n${makeDeep(depth)}+ ${item.key}: ${stringify(item.valueAfter, depth + 1)}`;
        }
        case 'unchanged': {
          return `${makeDeep(depth)}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        }
        default: {
          throw new Error(`type ${item.type} is unknown`);
        }
      }
    });

    return ['{', ...arrOfStr, `${makeDeepBracket(depth)}}`].join('\n');
  };

  return iter(tree);
};

const getAnswerTree = (obj1, obj2) => {
  const keys = getSortedKeys(obj1, obj2);
  const arrayedAnsw = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: getAnswerTree(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });
  return arrayedAnsw;
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
  const answTree = getAnswerTree(obj1, obj2);
  const answer = becomeStylish(answTree);

  return answer;
};

export default gendiff;
