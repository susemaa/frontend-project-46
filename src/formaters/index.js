import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
};

const getFormatFunction = (format) => formats[format];

export default getFormatFunction;
