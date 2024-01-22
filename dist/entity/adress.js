"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Adress {
    constructor(street, number, zip, city) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }
    validate() {
        var _a, _b, _c, _d;
        if (((_a = this._street) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            throw new Error("Street is required");
        }
        if (((_b = this._zip) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            throw new Error("Zip is required");
        }
        if (((_c = this._city) === null || _c === void 0 ? void 0 : _c.length) === 0) {
            throw new Error("City is required");
        }
        if (((_d = this._number) === null || _d === void 0 ? void 0 : _d.length) === 0) {
            throw new Error("Number is required");
        }
    }
    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }
}
exports.default = Adress;
