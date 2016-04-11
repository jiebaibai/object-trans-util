var assign = require('assign-deep');

function transformToSimple(object, prefix, newObject) {
  if (object) {
    for (const fieldName in object) {
      if (object.hasOwnProperty(fieldName)) {
        const fieldValue = object[fieldName];

        if (fieldValue && fieldValue.constructor === Object) {
          const newPrefix = (prefix ? (prefix + fieldName) : fieldName) + '.'; 
          transformToSimple(fieldValue, newPrefix, newObject);
        } else {
          const newFieldName = (prefix || '') + fieldName;
          newObject[newFieldName] = fieldValue; // eslint-disable-line no-param-reassign
        }
      }
    }
  } else {
    newObject = null; // eslint-disable-line no-param-reassign
  }
}

function transformNestedToSimple(object) {
  const newObject = {};

  transformToSimple(object, null, newObject);

  return newObject;
}


function generateObj(names, value, newObject) {
  const name = names[names.length - 1];

  names.splice(names.length - 1, 1);
  if (names.length > 0) {
    let tmp = {};

    if (newObject.hasOwnProperty(name)) {
      tmp = newObject[name];
    }
    tmp[name] = value;
    generateObj(names, tmp, newObject);
  } else {
    newObject[name] = value; // eslint-disable-line no-param-reassign
  }
}

function transformSimpleToNested(object) {
  let newObj = {};

  for (const fieldName in object) {
    if (object.hasOwnProperty(fieldName)) {
      const fieldNames = fieldName.split('.');
      const fieldValue = object[fieldName];

      const tmp = {};
      generateObj(fieldNames, fieldValue, tmp);

      newObj = assign({}, newObj, tmp);
    }
  }

  return newObj;
}

module.exports = {
    transformNestedToSimple: transformNestedToSimple,
    transformSimpleToNested: transformSimpleToNested
}
