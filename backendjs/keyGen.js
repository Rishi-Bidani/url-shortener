class KeyGen {
    constructor() {
        this.availableChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        this.totalChars = 7;
        // this.indices = [];
        this.key = "";
    }

    returnKey() {
        for (let i = 0; i < this.totalChars; i++) {
            const index = Math.floor(Math.random() * this.availableChars.length + 1);
            // this.indices.push(index)
            this.key += this.availableChars[index]
        }
        return this.key;
    }
}

module.exports = {KeyGen}

// const key = new KeyGen();
// console.log(key.returnKey())
