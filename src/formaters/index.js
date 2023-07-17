import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatJSON = (tree) => JSON.stringify(tree, null, '  ');

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

const getFormatFunction = (format) => formats[format];

export default getFormatFunction;
