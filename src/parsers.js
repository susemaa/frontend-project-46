import yaml from 'js-yaml';
import path from 'node:path';

const getParseFunction = (filepath) => {
  const format = path.extname(filepath);

  if (format === '.yaml' || format === '.yml') {
    return yaml.load;
  }

  if (format === '.json') {
    return JSON.parse;
  }

  return null;
};

export default getParseFunction;
