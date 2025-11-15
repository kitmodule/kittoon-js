/**
 * MIT License
 * Copyright (c) 2025-present, Huỳnh Nhân Quốc
 * Open source @ github.com/kitmodule
 */

(function (global) {
    // Tạo namespace kitmodule nếu chưa có
    const kitmodule = global.kitmodule || (global.kitmodule = {});
    const $ = Symbol("$"); // symbol để lưu state private

    /**
     * Class KitTOON
     * Chuyển JavaScript Object → TOON format
     */
    function KitTOON(obj = {}) {
        if (typeof obj !== "object" || obj === null || Array.isArray(obj))
            throw new Error("KitTOON: input must be a plain object.");

        // default settings
        this[$] = {
            obj,          // object gốc
            inline: false, // array inline hay block
            delimiter: ",",// delimiter cho uniform array
            foldKeys: null,// prefix fold key
            flatten: null  // prefix flatten
        };
    }

    /** Bật chế độ inline array */
    KitTOON.prototype.inline = function (enable = true) {
        this[$].inline = enable;
        return this;
    };

    /** Bật chế độ block array */
    KitTOON.prototype.block = function (enable = true) {
        this[$].inline = !enable;
        return this;
    };

    /** Đặt delimiter cho uniform array */
    KitTOON.prototype.delimiter = function (delim = ",") {
        this[$].delimiter = delim;
        return this;
    };

    /** Fold keys với prefix hoặc boolean */
    KitTOON.prototype.fold = function (prefix = "") {
        this[$].foldKeys = prefix;
        return this;
    };

    /** Flatten object với prefix */
    KitTOON.prototype.flatten = function (prefix = "") {
        this[$].flatten = prefix;
        return this;
    };

    /**
     * Chuyển object thành TOON string
     */
    KitTOON.prototype.convert = function () {
        const { obj, inline, delimiter, foldKeys, flatten } = this[$];

        // Nếu flatten, xử lý object trước
        const target = flatten ? flattenObject(obj, foldKeys, flatten) : obj;

        // Encode mỗi top-level key
        return Object.entries(target)
            .map(([key, value]) => encodeTopLevel(key, value, inline, delimiter))
            .join("\n");
    };

    /**
     * Encode từng top-level key
     * Nếu là uniform array: xuất dạng [N]{field1,field2,...}:
     * Nếu là nested object: recurse
     */
    function encodeTopLevel(key, value, inline, delimiter) {
        // uniform object array
        if (Array.isArray(value) && isUniformObjectArray(value)) {
            const keys = Object.keys(value[0]);
            const len = value.length;
            const header = `${key}[${len}]{${keys.join(delimiter)}}:`;
            const rows = value
                .map(row => keys.map(k => row[k]).join(delimiter))
                .join("\n");
            return `${header}\n${rows}`;
        }

        // nested object
        if (typeof value === "object" && value !== null) {
            return `${key}:\n${encodeTOON(value, inline, delimiter)}`;
        }

        // primitive
        return `${key}: ${value}`;
    }

    /**
     * Encode object recursively
     */
    function encodeTOON(value, inline, delimiter) {
        if (value === null || value === undefined) return '""';
        if (typeof value === "boolean" || typeof value === "number") return value;
        if (typeof value === "string") return value;

        if (Array.isArray(value)) {
            if (isUniformObjectArray(value)) {
                const keys = Object.keys(value[0]);
                const header = `[${value.length}]{${keys.join(delimiter)}}:`;
                const rows = value
                    .map(row => keys.map(k => row[k]).join(delimiter))
                    .join("\n");
                return `${header}\n${rows}`;
            }
            return inline ? `[${value.join(delimiter)}]` : value.map(v => `- ${v}`).join("\n");
        }

        if (typeof value === "object") {
            return Object.entries(value)
                .map(([k, v]) => encodeTopLevel(k, v, inline, delimiter))
                .join("\n");
        }

        return value;
    }

    /**
     * Kiểm tra array có phải uniform object array
     */
    function isUniformObjectArray(arr) {
        if (!arr.length) return false;
        if (!arr.every(x => typeof x === "object" && !Array.isArray(x))) return false;
        const base = Object.keys(arr[0]).sort().join(",");
        return arr.every(o => Object.keys(o).sort().join(",") === base);
    }

    /**
     * Flatten object: nested object → single-level keys
     */
    function flattenObject(obj, foldKeys, prefix = "") {
        const result = {};
        for (const [k, v] of Object.entries(obj)) {
            const key = foldKeys ? (prefix + k).replace(/\./g, '') : (prefix ? prefix + '.' + k : k);
            if (v && typeof v === "object" && !Array.isArray(v)) {
                Object.assign(result, flattenObject(v, foldKeys, key + '.'));
            } else {
                result[key] = v;
            }
        }
        return result;
    }

    // --------------------------------
    // Export
    global.KitTOON = KitTOON;
    global.convertTOON = obj => new KitTOON(obj).convert();

    kitmodule.TOON = KitTOON;
    kitmodule.toon = obj => new KitTOON(obj);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { KitTOON };
    }

})(typeof window !== 'undefined' ? window : globalThis);
