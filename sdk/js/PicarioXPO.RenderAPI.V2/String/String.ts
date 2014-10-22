interface String {
    format(...replacements: string[]): string;
    appendDictionary(values: Collections.Dictionary<string, Object>): string;
    endsWith(value: string) : boolean;
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined'? args[number] : match);
    };
}

if (!String.prototype.appendDictionary) {
    String.prototype.appendDictionary = function() {
        var dictionary = arguments[0];
        var result = this.toString();
        dictionary.forEach((key, value) => {
            if (key && value) {
                result = result.concat(key, value, false);
            }
        });

        return result;
    }
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (value) {
        var lastIndex = this.lastIndexOf(value);
        return (lastIndex != -1) && (lastIndex + value.length == this.length);
    }
}