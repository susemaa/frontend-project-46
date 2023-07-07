import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

const getFormatFunction = (format) => formats[format];

export default getFormatFunction;
