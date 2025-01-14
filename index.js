const fs = require("fs");

class LangParser {
    constructor(filePath, language) {
        this.data = {};
        this.language = language.toLowerCase(); 
        this.author = null; 
        this.filePath = filePath; 
        this.loadFile(filePath);
    }


    loadFile(filePath) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split(/\r?\n/);

        let currentKey = null;
        let currentValue = "";
        let isMultiLine = false;
        let detectedLanguage = null;

        lines.forEach((line) => {

            const cleanedLine = line.replace(/#.*$/, "").trim();
            if (!cleanedLine) return;


            if (cleanedLine.startsWith("lang:")) {
                const langMatch = cleanedLine.match(/^lang:\s*(\w[\w-]*)\s*=\s*(\w[\w-]*)$/);
                if (langMatch) {
                    detectedLanguage = langMatch[1].toLowerCase();
                }
                return;
            }

            if (cleanedLine.startsWith("author:")) {
                const authorMatch = cleanedLine.match(/^author:\s*(.*)$/);
                if (authorMatch) {
                    this.author = authorMatch[1].trim();
                }
                return;
            }


            if (isMultiLine) {
                const endMatch = cleanedLine.match(/^(.*?)\`ss$/); 
                if (endMatch) {
                    currentValue += `\n${endMatch[1]}`; 
                    this.data[currentKey] = this.interpolate(currentValue.trim());
                    currentKey = null;
                    currentValue = "";
                    isMultiLine = false;
                } else {
                    currentValue += `\n${cleanedLine}`; 
                }
                return;
            }


            const match = cleanedLine.match(/^(\w+)\s*=\s*(["`])(.*?)\2$/s);
            if (match) {
                const [_, key, delimiter, value] = match;
                this.data[key] = this.interpolate(value.trim());
                return;
            }

            const multiLineMatch = cleanedLine.match(/^(\w+)\s*=\s*ss\`(.*)$/s);
            if (multiLineMatch) {
                currentKey = multiLineMatch[1];
                currentValue = multiLineMatch[2];
                isMultiLine = true;
                return;
            }
        });


        if (detectedLanguage && detectedLanguage !== this.language) {
            console.warn(
                `\x1b[33m[!WARNING] File ${filePath} not have ${this.language}\x1b[39m`
            );
        }


        if (detectedLanguage && detectedLanguage !== this.language) {
            this.data = null;
        }
    }

    interpolate(value) {
        return (params = {}) => {
            return value.replace(/\$\{(\w+)\}/g, (_, varName) => {
                return params[varName] || `\${${varName}}`;
            });
        };
    }

    // Метод для получения значения по ключу
    get(key, params = {}) {
        if (this.data && key in this.data) {
            return this.data[key](params);
        }
        return null; 
    }

    getAuthor() {
        return this.author;
    }

    getLang() {
        return this.language
    }
}


module.exports = LangParser;