class XpoUrlTemplate {
    index: number;
    value: string;

    constructor(index: number, value: string) {
        this.index = index;
        this.value = value;
    }

    /*
     * Gets or sets the index of this template
     */
    getIndex(): number { return this.index; }
    setIndex(val: number) { this.index = val; }
    
    /*
     * Gets or sets the value of this template
     */
    getValue(): string { return this.value; }
    setValue(val: string) { this.value = val; }
}