/**
 * The custom `sort` method for
 * for the [`css-mqpacker`](https://www.npmjs.com/package/css-mqpacker) or
 * [`pleeease`](https://www.npmjs.com/package/pleeease) which using `css-mqpacker`
 * or, perhaps, something else ))
 *
 * @module sort-css-media-queries
 * @author Oleg Dutchenko <dutchenko.o.wezom@gmail.com>
 * @version 1.1.1
 */

'use strict';

// ----------------------------------------
// Private
// ----------------------------------------

const minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/;
const minWidth = /\(\s*min(-device)?-width/;
const maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/;
const maxWidth = /\(\s*max(-device)?-width/;

const isMinWidth = testQuery(minMaxWidth, maxMinWidth, minWidth);
const isMaxWidth = testQuery(maxMinWidth, minMaxWidth, maxWidth);

const minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/;
const minHeight = /\(\s*min(-device)?-height/;
const maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/;
const maxHeight = /\(\s*max(-device)?-height/;

const isMinHeight = testQuery(minMaxHeight, maxMinHeight, minHeight);
const isMaxHeight = testQuery(maxMinHeight, minMaxHeight, maxHeight);

const maxValue = Number.MAX_VALUE;

/**
 * Obtain the length of the media request in pixels.
 * Copy from original source `function inspectLength (length)`
 * {@link https://github.com/hail2u/node-css-mqpacker/blob/master/index.js#L58}
 * @private
 * @param {string} length
 * @return {number}
 * @sourceCode
 */
function getQueryLength (length) {
	length = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

	if (length === null) {
		return maxValue;
	}

	let num = length[1];
	let unit = length[2];

	switch (unit) {
		case 'ch':
			num = parseFloat(num) * 8.8984375;
			break;

		case 'em':
		case 'rem':
			num = parseFloat(num) * 16;
			break;

		case 'ex':
			num = parseFloat(num) * 8.296875;
			break;

		case 'px':
			num = parseFloat(num);
			break;
	}

	return num;
}

/**
 * Wrapper for creating test functions
 * @private
 * @param {RegExp} doubleTestTrue
 * @param {RegExp} doubleTestFalse
 * @param {RegExp} singleTest
 * @return {Function}
 * @sourceCode
 */
function testQuery (doubleTestTrue, doubleTestFalse, singleTest) {
	/**
	 * @param {string} query
	 * @return {boolean}
	 */
	return function (query) {
		if (doubleTestTrue.test(query)) {
			return true;
		} else if (doubleTestFalse.test(query)) {
			return false;
		}
		return singleTest.test(query);
	};
}

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * Sorting an array with media queries
 * according to the mobile-first methodology.
 * @param {string} a
 * @param {string} b
 * @return {number} 1 / 0 / -1
 * @sourceCode
 */
function sortCSSmq (a, b) {
	let minA = isMinWidth(a) || isMinHeight(a);
	let maxA = isMaxWidth(a) || isMaxHeight(a);

	let minB = isMinWidth(b) || isMinHeight(b);
	let maxB = isMaxWidth(b) || isMaxHeight(b);

	if (minA && maxB) {
		return -1;
	}
	if (maxA && minB) {
		return 1;
	}

	let lengthA = getQueryLength(a);
	let lengthB = getQueryLength(b);

	if (lengthA === maxValue && lengthB === maxValue) {
		return a.localeCompare(b);
	} else if (lengthA === maxValue) {
		return 1;
	} else if (lengthB === maxValue) {
		return -1;
	}

	if (lengthA > lengthB) {
		if (maxA) {
			return -1;
		}
		return 1;
	}

	if (lengthA < lengthB) {
		if (maxA) {
			return 1;
		}
		return -1;
	}

	return a.localeCompare(b);
}

/**
 * Sorting an array with media queries
 * according to the desktop-first methodology.
 * @param {string} a
 * @param {string} b
 * @return {number} 1 / 0 / -1
 * @sourceCode
 */
sortCSSmq.desktopFirst = function (a, b) {
	let minA = isMinWidth(a) || isMinHeight(a);
	let maxA = isMaxWidth(a) || isMaxHeight(a);

	let minB = isMinWidth(b) || isMinHeight(b);
	let maxB = isMaxWidth(b) || isMaxHeight(b);

	if (minA && maxB) {
		return 1;
	}
	if (maxA && minB) {
		return -1;
	}

	let lengthA = getQueryLength(a);
	let lengthB = getQueryLength(b);

	if (lengthA === maxValue && lengthB === maxValue) {
		return a.localeCompare(b);
	} else if (lengthA === maxValue) {
		return 1;
	} else if (lengthB === maxValue) {
		return -1;
	}

	if (lengthA > lengthB) {
		if (maxA) {
			return -1;
		}
		return 1;
	}

	if (lengthA < lengthB) {
		if (maxA) {
			return 1;
		}
		return -1;
	}

	return -(a.localeCompare(b));
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = sortCSSmq;
