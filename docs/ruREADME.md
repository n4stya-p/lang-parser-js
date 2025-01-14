# lang-parser

Поддержка файлов `.lang` с пользовательским синтаксисом.

[![Лицензия GitHub](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rmariuzzo/Lang.js/master/LICENSE)

---

## Особенности
- Легкий и простой анализатор для файлов `.lang`.
- Поддерживает многострочные строки и интерполяцию переменных.
- Обрабатывает логику анализа, специфичную для языка.
- Обнаруживает несоответствующие языки и предупреждает пользователей.

---

## Установка
[Установка на английском языке](docs/ruREADME.md#Installation)

- **NPM:** `npm install lang.js`
- **Из источника:** [Здесь](https://github.com/n4stya-p/lang-parser-js)

---

## Документация
[Документация на английском языке](README.md#documentation)

### Пример файла

Вот пример файла `.lang`:
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

### Инициализация

```js
const LangParser = require("lang-parser")
const Language = new LangParser("./your_lang_file.lang", "en-us")
```

- **LangParser**: Первый аргумент указывает путь к файлу `.lang`.
- **language**: Второй аргумент — целевой язык. Если он не соответствует файлу, парсер **прекратит** работу.

---

### Методы

#### `interpolate`
Это системная функция. Она не предназначена для прямого использования.

#### `get`

Выдает перевод с использованием ключа.

**Пример**:

```js
const LangParser = require("lang-parser")
const Language = new LangParser("./your_lang_file.lang", "en-us")

console.log(Language.get("key_1", { name: "John" })) // Возвращает: Привет, John!

console.log(Language.get("non_existing_key")) // Возвращает: null
```

#### `getAuthor`

Возвращает автора перевода.

**Пример**:

```js
console.log(Language.getAuthor()) // Возвращает: n4stya
```

#### `getLang`

Возвращает язык, указанный в файле `.lang`.

**Пример**:

```js
console.log(Language.getLang()) // Возвращает: en-us
```

---

## Благодарности
Особая благодарность [Obzori](https://github.com/Obzoriks) за помощь!

---

## Участие

Мы приветствуем участие! Не стесняйтесь отправлять запросы на включение или сообщать о проблемах.

---

## Лицензия
Этот проект лицензирован в соответствии с лицензией MIT. Подробности см. в файле [LICENSE](https://raw.githubusercontent.com/rmariuzzo/Lang.js/master/LICENSE).
```