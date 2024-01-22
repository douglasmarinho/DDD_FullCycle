"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = true;
        this._id = id;
        this._name = name;
        this.valdate();
    }
    valdate() {
        var _a, _b;
        if (((_a = this._name) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            throw new Error("Name is required");
        }
        if (((_b = this._id) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            throw new Error("Id is required");
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set adress(adress) {
        this._adress = adress;
    }
    changeName(name) {
        this._name = name;
        this.valdate();
    }
    activate() {
        if (this._adress === undefined) {
            throw new Error("Adress is mandatory to activate costumer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
}
exports.default = Customer;
