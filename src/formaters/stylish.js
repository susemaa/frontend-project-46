import _ from 'lodash';

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

const formatStylish = (tree) => {
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

export default formatStylish;
