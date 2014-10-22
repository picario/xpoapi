class DesignKey {
    private keyList = new Array<string>();
    private americanCulture = "en-US";

    addToList(value: any, omitIfDefault: boolean = true) {
        if (value === undefined || value === null) {
            this.addEmpty();
            return;
        }else if ((!value || value.toString() == "") && omitIfDefault) {
            this.addEmpty();
            return;
        }

        //handle enum key instead of value

        //We only want to add doubles with an american culture.
        //By using the bitwise or we can check if a number is an integer or a double.
        //When the bitwise or is the same as the value we know it's an integer.
        if (!isNaN(parseFloat(value)) && ((value | 0) != value))
            this.addDouble(value, omitIfDefault);
        else
            this.keyList.push(value.toString());
    }

    addDouble(value: number, omitIfDefault: boolean = true) {
        var convertValue = value.toLocaleString(this.americanCulture);

        if ((convertValue.length != null && convertValue != "") || !omitIfDefault)
            this.keyList.push(convertValue);
    }

    getUrlValue() {
        return this.keyList.join(",");
    }

    getValues(designs: Array<XpoUrlObject>): string {
        throw ("Can't call getValues on base class.");
    }

    addEmpty() {
        this.keyList.push("");
    }

    isEmpty() {
        var isEmpty = true;

        for (var i = 0; i < this.keyList.length; i++) {
            if (this.keyList[i]) {
                isEmpty = false;
                break;
            }
        }

        return isEmpty;
    }
}