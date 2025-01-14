
# Lang-parser

Support for `.lang` files with custom syntax.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rmariuzzo/Lang.js/master/LICENSE)

---

## Features
- Lightweight and simple parser for `.lang` files.
- Supports multi-line strings and variable interpolation.
- Handles language-specific parsing logic.
- Detects mismatched languages and warns users.

---

## Installation
[Установка на русском](docs/ruREADME.md#установка)

- **NPM:** `npm install lang.js`
- **From Source:** [Here](https://github.com/n4stya-p/lang-parser-js)

---

## Documentation
[Документация на русском](docs/ruREADME.md#документация)

### File Example

Here is an example of a `.lang` file:
```
lang: en-us
author: n4stya

key_1 = "Hello, ${name}!"
key_2 = ss`
This is a 
multiline string
`ss
```

---

### Initialization

```js
const LangParser = require("lang-parser")
const Language = new LangParser("./your_lang_file.lang", "en-us")
```

- **LangParser**: The first argument specifies the path to the `.lang` file. 
- **language**: The second argument is the target language. If it does not match the file, the parser will **stop** working.

---

### Methods

#### `interpolate`
This is a system function. It is not intended for direct usage.

#### `get`

Gives a translation using a key.

**Example**:

```js
const LangParser = require("lang-parser")
const Language = new LangParser("./your_lang_file.lang", "en-us")

console.log(Language.get("key_1", { name: "John" })) // Returns: Hello, John!
console.log(Language.get("non_existing_key")) // Returns: null
```

#### `getAuthor`

Returns the author of the translation.

**Example**:

```js
console.log(Language.getAuthor()) // Returns: n4stya
```

#### `getLang`

Returns the language specified in the `.lang` file.

**Example**:

```js
console.log(Language.getLang()) // Returns: en-us
```

---

## Thanks
Special thanks to [Obzori](https://github.com/Obzoriks) for helping!

---

## Contributing

We welcome contributions! Feel free to submit pull requests or report issues.

---

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/rmariuzzo/Lang.js/master/LICENSE) file for details.
```

