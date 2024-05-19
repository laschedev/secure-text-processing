# Secure Text Processing

Secure Text Processing is a JavaScript module for safely handling text to prevent XSS attacks and other security vulnerabilities. It includes functions for escaping HTML, sanitizing URLs, stripping scripts, cleaning text, and more.

## Installation

To install the module, you can use npm:

```bash
npm install secure-text-processing
```

## Usage

First, require the module in your JavaScript file:

```javascript
const {
    escapeHtml,
    sanitizeUrl,
    stripScripts,
    setSafeInnerHTML,
    cleanText,
    safeJsonParse,
    sanitizeInput,
    appendSafeTextNode
} = require('secure-text-processing');
```

### Functions

#### `escapeHtml(str)`

Escapes HTML special characters in a string.

```javascript
const unsafeHtml = '<script>alert("XSS")</script>';
const safeHtml = escapeHtml(unsafeHtml);
console.log('Escaped HTML:', safeHtml); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

#### `sanitizeUrl(url)`

Sanitizes a URL by ensuring it has a valid protocol (http or https).

```javascript
const unsafeUrl = 'javascript:alert("XSS")';
const safeUrl = sanitizeUrl(unsafeUrl);
console.log('Sanitized URL:', safeUrl); // about:blank
```

#### `stripScripts(str)`

Strips `<script>` tags from a string.

```javascript
const unsafeStringWithScript = '<div><script>alert("XSS")</script></div>';
const safeStringWithoutScript = stripScripts(unsafeStringWithScript);
console.log('Stripped Scripts:', safeStringWithoutScript); // <div></div>
```

#### `setSafeInnerHTML(element, html)`

Sets the innerHTML of an element to a sanitized HTML string.

```javascript
const element = { innerHTML: '' }; // Simulating a DOM element
setSafeInnerHTML(element, unsafeHtml);
console.log('Safe Inner HTML:', element.innerHTML); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

#### `cleanText(text)`

Cleans text by removing any characters that are not alphanumeric, punctuation, or spaces.

```javascript
const dirtyText = 'Hello! <script>bad()</script>';
const clean = cleanText(dirtyText);
console.log('Clean Text:', clean); // Hello! bad()
```

#### `safeJsonParse(str)`

Safely parses a JSON string.

```javascript
const jsonString = '{"key": "value"}';
const parsedJson = safeJsonParse(jsonString);
console.log('Parsed JSON:', parsedJson); // { key: 'value' }
```

#### `sanitizeInput(input)`

Sanitizes input by escaping HTML, stripping scripts, and cleaning text.

```javascript
const unsafeInput = '<script>alert("XSS")</script>';
const sanitizedInput = sanitizeInput(unsafeInput);
console.log('Sanitized Input:', sanitizedInput); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

#### `appendSafeTextNode(parent, text)`

Appends a text node with sanitized text to a parent element.

```javascript
const parentElement = { appendChild: function(node) { this.child = node; } }; // Simulating a DOM element
appendSafeTextNode(parentElement, 'Hello <world>');
console.log('Appended Safe Text Node:', parentElement.child); // Hello <world>
```

## License

This project is licensed under the MIT License.

### Ek Notlar

1. **README.md İçeriği:** `README.md` dosyası projenizin kurulum ve kullanım talimatlarını içermelidir. Fonksiyonlar hakkında kısa açıklamalar ve örnekler vermek kullanıcıların modülü kolayca kullanabilmesini sağlar.
2. **Modül Adı:** `secure-text-processing` modül adını kullanarak, npm üzerinden yayımlamadan önce npm'de bu adın müsait olup olmadığını kontrol etmelisiniz. Eğer ad alınmışsa, benzersiz bir isim seçmelisiniz.
3. **npm install:** Kullanıcıların projeyi kendi sistemlerine kurabilmeleri için gerekli komutları sağlar.
4. **Fonksiyon Açıklamaları ve Örnek Kullanımlar:** Her fonksiyonun ne yaptığını ve nasıl kullanıldığını açıklar. Bu, kullanıcıların modülün yeteneklerini hızlıca kavramalarına yardımcı olur.

Bu adımları izleyerek projenizi iyi bir şekilde belgeleyebilir ve kullanıcılara yardımcı olabilirsiniz.
