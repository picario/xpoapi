interface String {
    format(...replacements: string[]): string;
    appendDictionary(values: Collections.Dictionary<string, Object>): string;
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