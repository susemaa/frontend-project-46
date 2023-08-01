import yaml from 'js-yaml';

const getObjFromData = (format, data) => {
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }

  if (format === '.json') {
    return JSON.parse(data);
  }

  return null;
};

export default getObjFromData;
