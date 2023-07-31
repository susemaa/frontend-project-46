import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatJSON = (tree) => JSON.stringify(tree, null, '  ');

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

const formatTree = (format, tree) => formats[format](tree);

export default formatTree;
