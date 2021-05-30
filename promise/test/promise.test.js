const { expect } = require("@jest/globals");
const { test } = require("jest-circus");
const {Promise} = require("../core")

describe('Promise constructor', () => {
    it("executor muse be a function",()=>{
        expect(()=>new Promise()).toThrowError(TypeError)
        expect(()=>new Promise(()=>{})).toBeCalled
    })
});