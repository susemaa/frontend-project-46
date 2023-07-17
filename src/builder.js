import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unionedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionedKeys);

  return sortedKeys;
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

export default getAnswerTree;
