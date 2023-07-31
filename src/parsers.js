import yaml from 'js-yaml';

const getJsonedObj = (format, obj) => {
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(obj);
  }

  if (format === '.json') {
    return JSON.parse(obj);
  }

  return null;
};

export default getJsonedObj;
