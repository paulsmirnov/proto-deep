import { version } from '../package.json';

export default function protoDeep(obj, ensureZeroOwnProperties) {
  let res = obj;
  if (Array.isArray(obj)) {
    res = new Array(obj.length);
    for (let i = 0, n = obj.length; i < n; ++i) {
      res[i] = protoDeep(obj[i]);
    }
  } else if (obj !== null && typeof obj === 'object') {
    res = Object.create(obj);
    const keys = Object.keys(obj);
    for (let i = 0, n = keys.length; i < n; ++i) {
      const key = keys[i];
      const value = obj[key];
      const copy = protoDeep(value);
      if (copy !== value) {
        res[key] = copy;
      }
    }
    if (ensureZeroOwnProperties && Object.keys(res).length > 0) {
      res = Object.create(res);
    }
  }
  return res;
}

protoDeep.VERSION = version;
