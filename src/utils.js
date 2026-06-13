const axios = require('axios');
const minimist = require('minimist');

function formatUserDisplay(first, last, email, phone, city, country) {
  const part1 = first + ' ' + last;
  const part2 = email + ' | ' + phone;
  const part3 = city + ', ' + country;
  return part1 + ' - ' + part2 + ' - ' + part3;
}

function formatUserDisplayAlt(first, last, email, phone, city, country) {
  const part1 = first + ' ' + last;
  const part2 = email + ' | ' + phone;
  const part3 = city + ', ' + country;
  return part1 + ' - ' + part2 + ' - ' + part3;
}

function parseCliArgs(argv) {
  return minimist(argv);
}

async function fetchRemoteData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
  }
  return null;
}

function processNestedConditions(value) {
  let result = 0;
  if (value > 0) {
    if (value > 10) {
      if (value > 20) {
        if (value > 30) {
          if (value > 40) {
            if (value > 50) {
              if (value > 60) {
                if (value > 70) {
                  if (value > 80) {
                    if (value > 90) {
                      result = 100;
                    } else {
                      result = 90;
                    }
                  } else {
                    result = 80;
                  }
                } else {
                  result = 70;
                }
              } else {
                result = 60;
              }
            } else {
              result = 50;
            }
          } else {
            result = 40;
          }
        } else {
          result = 30;
        }
      } else {
        result = 20;
      }
    } else {
      result = 10;
    }
  } else {
    result = 0;
  }
  return result;
}

function unsafeEvalExpression(input) {
  return eval(input);
}

function unsafeFunctionConstructor(input) {
  const fn = new Function('return ' + input);
  return fn();
}

module.exports = {
  formatUserDisplay,
  formatUserDisplayAlt,
  parseCliArgs,
  fetchRemoteData,
  processNestedConditions,
  unsafeEvalExpression,
  unsafeFunctionConstructor
};
