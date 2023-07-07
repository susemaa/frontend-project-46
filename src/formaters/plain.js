import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (node, path) => {
    const arrOfStr = node.flatMap((item) => {
      switch (item.type) {
        case 'nested': {
          return iter(item.children, `${path}${item.key}.`);
        }
        case 'added': {
          return `Property '${path}${item.key}' was added with value: ${normalize(item.value)}`;
        }
        case 'deleted': {
          return `Property '${path}${item.key}' was removed`;
        }
        case 'changed': {
          return `Property '${path}${item.key}' was updated. From ${normalize(item.valueBefore)} to ${normalize(item.valueAfter)}`;
        }
        default: {
          return [];
        }
      }
    });

    return arrOfStr.join('\n');
  };

  return iter(tree, '');
};

export default formatPlain;
