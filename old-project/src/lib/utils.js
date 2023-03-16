import * as Sentry from '@sentry/browser'
import axios from 'axios'

const { hostname } = window.location
// TODO: add production server
if (hostname.includes('ocsp-test') || hostname.includes('ocsp-dev')) {
  Sentry.init({ dsn: 'https://03088695ab3d4112b00f9001b820d0a9@sentry.oncodesign.com/3' })
}

/**
 * Get a clone array with inserted item
 * @param {*[]} array Array.
 * @param {number} index Insertion index.
 * @param {Object} item Item to be inserted.
 * @returns {*[]}
 */
function add(array, index, item) {
  return [...array.slice(0, index), item, ...array.slice(index)]
}

/**
 * Get a clone array with updated item
 * @param {*[]} array Array.
 * @param {number} index Update index.
 * @param {Object} item Item to be updated.
 * @returns {*[]}
 */
function replace(array, index, item) {
  return [...array.slice(0, index), item, ...array.slice(index + 1)]
}

/**
 * Get a clone array with removed item
 * @param {*[]} array Array.
 * @param {number} index Deletion index.
 * @param {Object} item Item to be deleted.
 * @returns {*[]}
 */
function remove(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

function isDefined(v) {
  return typeof v !== 'undefined' && v !== null
}

const compareVars = function(a, b) {
  if (a === b) return true
  if (!isDefined(a) || !isDefined(b)) return false
  if (typeof a !== typeof b) return false
  if (typeof a === 'object') {
    if (a.length) return arrayEquals(a, b)
    else return objectEquals(a, b)
  }
  return false
}

function objectEquals(a, b) {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  for (let i = 0, l = aKeys.length, key; i < l; ++i) {
    key = aKeys[i]
    if (!compareVars(a[key], b[key])) return false
  }
  return true
}

function arrayEquals(a, b) {
  if (a === b) return true
  if (!isDefined(a) || !isDefined(b)) return false
  if (a.length !== b.length) return false

  for (let i = 0, l = a.length; i < l; ++i) {
    if (!compareVars(a[i], b[i])) return false
  }
  return true
}

function mapIndexFunc(obj, i) {
  return {
    index: i,
    obj: obj
  }
}
/***********************************************/
// This function filters elements it contains   /
// according to the value of the attribute attr /
// of each element.  							/
// It returns the list of matching elements     /
// encapsulated with the index : 				/
// {obj: elem, index: indexOfElem}				/
/***********************************************/
function filterPerAttr(arr, attr, value) {
  return arr.map(mapIndexFunc).filter(elem => elem.obj[attr] === value)
}

/**
 * Higher-order function, to avoid repeating error handlers for Promises.
 * * Nice tip from : https://www.dotconferences.com/2017/12/wes-bos-async-await.
 * @ params {function} func Function that returns a Promise, without error handler.
 * @ params {function} errorHandler Explicit.
 */
function handlePromiseError(func, errorHandler) {
  return function(...params) {
    return func(...params).catch(errorHandler)
  }
}

function consoleLog(error, info) {
  Sentry.captureException(info)
}

/**
 * Higher order function to debounce a function, i.e. to avoid unexpected double clicks (not good for both React and the backend) :
 * One waits for a period without click (duration = timeout) before triggering the function 'func'
 * @param [Function}
 * @param {number} minWaitingTime - Waiting period in milliseconds without clicks before the function is executed.
 * @returns {Function} - Debounced function.
 */
function debounce(func, minWaitingTime = 150) {
  let timeout
  return function(...args) {
    // stop then restart future execution
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, minWaitingTime)
  }
}

const AVAILABLE_LANGUAGES = {
  en: 'en.json',
  fr: 'fr.json'
}

function getLanguage() {
  return (
    navigator.languages.reduce((res, language) => {
      if (res) return res

      const l = language.split('-')[0]
      if (AVAILABLE_LANGUAGES[l]) return l

      return res
    }, null) || 'en'
  )
}

async function loadLanguage(language) {
  const response = await handlePromiseError(
    axios.get,
    consoleLog
  )(`/i18n/${AVAILABLE_LANGUAGES[language]}`)
  return response.data
}

export {
  debounce,
  add,
  replace,
  remove,
  isDefined,
  arrayEquals,
  compareVars,
  consoleLog,
  filterPerAttr,
  getLanguage,
  loadLanguage,
  handlePromiseError,
  objectEquals
}
