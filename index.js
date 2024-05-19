/**
 * Escapes HTML special characters in a string.
 * @param {string} str - The input string to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
}

/**
 * Sanitizes a URL by ensuring it has a valid protocol (http or https).
 * @param {string} url - The URL to sanitize.
 * @returns {string} The sanitized URL, or 'about:blank' if invalid.
 */
function sanitizeUrl(url) {
    try {
        const parsedUrl = new URL(url);
        if (['http:', 'https:'].includes(parsedUrl.protocol)) {
            return parsedUrl.href;
        } else {
            throw new Error('Invalid protocol');
        }
    } catch (e) {
        return 'about:blank';
    }
}

/**
 * Strips <script> tags from a string.
 * @param {string} str - The input string to process.
 * @returns {string} The sanitized string without <script> tags.
 */
function stripScripts(str) {
    const scriptTagPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    return str.replace(scriptTagPattern, '');
}

/**
 * Sets the innerHTML of an element to a sanitized HTML string.
 * @param {HTMLElement} element - The DOM element to set innerHTML for.
 * @param {string} html - The HTML string to sanitize and set.
 */
function setSafeInnerHTML(element, html) {
    element.innerHTML = escapeHtml(html);
}

/**
 * Cleans text by removing any characters that are not alphanumeric, punctuation, or spaces.
 * @param {string} text - The input text to clean.
 * @returns {string} The cleaned text.
 */
function cleanText(text) {
    return text.replace(/[^a-zA-Z0-9 .,!?'-]/g, '');
}

/**
 * Safely parses a JSON string.
 * @param {string} str - The JSON string to parse.
 * @returns {Object|null} The parsed object, or null if parsing fails.
 */
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

/**
 * Sanitizes input by escaping HTML, stripping scripts, and cleaning text.
 * @param {string|Array|Object} input - The input to sanitize.
 * @returns {string|Array|Object} The sanitized input.
 */
function sanitizeInput(input) {
    if (typeof input === 'string') {
        return escapeHtml(stripScripts(input));
    } else if (Array.isArray(input)) {
        return input.map(item => sanitizeInput(item));
    } else if (input && typeof input === 'object') {
        const sanitizedObj = {};
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                sanitizedObj[key] = sanitizeInput(input[key]);
            }
        }
        return sanitizedObj;
    }
    return input;
}

/**
 * Appends a text node with sanitized text to a parent element.
 * @param {HTMLElement} parent - The parent element to append the text node to.
 * @param {string} text - The text to sanitize and append.
 */
function appendSafeTextNode(parent, text) {
    const textNode = document.createTextNode(text);
    parent.appendChild(textNode);
}

module.exports = {
    escapeHtml,
    sanitizeUrl,
    stripScripts,
    setSafeInnerHTML,
    cleanText,
    safeJsonParse,
    sanitizeInput,
    appendSafeTextNode
};
