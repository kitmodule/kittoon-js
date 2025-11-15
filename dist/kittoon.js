(function (global) {
    const kitmodule = global.kitmodule || (global.kitmodule = {});
    const $ = Symbol("$");

    function KitTOON(obj = {}) {
        if (typeof obj !== "object" || obj === null || Array.isArray(obj))
            throw new Error("KitTOON: input must be a plain object.");
        this[$] = {
            obj,
            inline: !1,
            delimiter: ",",
            foldKeys: null,
            flatten: null
        }
    }
    KitTOON.prototype.inline = function (enable = !0) {
        this[$].inline = enable;
        return this
    };
    KitTOON.prototype.block = function (enable = !0) {
        this[$].inline = !enable;
        return this
    };
    KitTOON.prototype.delimiter = function (delim = ",") {
        this[$].delimiter = delim;
        return this
    };
    KitTOON.prototype.fold = function (prefix = "") {
        this[$].foldKeys = prefix;
        return this
    };
    KitTOON.prototype.flatten = function (prefix = "") {
        this[$].flatten = prefix;
        return this
    };
    KitTOON.prototype.convert = function () {
        const {
            obj,
            inline,
            delimiter,
            foldKeys,
            flatten
        } = this[$];
        const target = flatten ? flattenObject(obj, foldKeys, flatten) : obj;
        return Object.entries(target).map(([key, value]) => encodeTopLevel(key, value, inline, delimiter)).join("\n")
    };

    function encodeTopLevel(key, value, inline, delimiter) {
        if (Array.isArray(value) && isUniformObjectArray(value)) {
            const keys = Object.keys(value[0]);
            const len = value.length;
            const header = `${key}[${len}]{${keys.join(delimiter)}}:`;
            const rows = value.map(row => keys.map(k => row[k]).join(delimiter)).join("\n");
            return `${header}\n${rows}`
        }
        if (typeof value === "object" && value !== null) {
            return `${key}:\n${encodeTOON(value, inline, delimiter)}`
        }
        return `${key}: ${value}`
    }

    function encodeTOON(value, inline, delimiter) {
        if (value === null || value === undefined) return '""';
        if (typeof value === "boolean" || typeof value === "number") return value;
        if (typeof value === "string") return value;
        if (Array.isArray(value)) {
            if (isUniformObjectArray(value)) {
                const keys = Object.keys(value[0]);
                const header = `[${value.length}]{${keys.join(delimiter)}}:`;
                const rows = value.map(row => keys.map(k => row[k]).join(delimiter)).join("\n");
                return `${header}\n${rows}`
            }
            return inline ? `[${value.join(delimiter)}]` : value.map(v => `- ${v}`).join("\n")
        }
        if (typeof value === "object") {
            return Object.entries(value).map(([k, v]) => encodeTopLevel(k, v, inline, delimiter)).join("\n")
        }
        return value
    }

    function isUniformObjectArray(arr) {
        if (!arr.length) return !1;
        if (!arr.every(x => typeof x === "object" && !Array.isArray(x))) return !1;
        const base = Object.keys(arr[0]).sort().join(",");
        return arr.every(o => Object.keys(o).sort().join(",") === base)
    }

    function flattenObject(obj, foldKeys, prefix = "") {
        const result = {};
        for (const [k, v] of Object.entries(obj)) {
            const key = foldKeys ? (prefix + k).replace(/\./g, '') : (prefix ? prefix + '.' + k : k);
            if (v && typeof v === "object" && !Array.isArray(v)) {
                Object.assign(result, flattenObject(v, foldKeys, key + '.'))
            } else {
                result[key] = v
            }
        }
        return result
    }
    global.KitTOON = KitTOON;
    global.convertTOON = obj => new KitTOON(obj).convert();
    kitmodule.TOON = KitTOON;
    kitmodule.toon = obj => new KitTOON(obj);
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            KitTOON
        }
    }
})(typeof window !== 'undefined' ? window : globalThis)