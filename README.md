# 📝 KitTOON by Kitmodule

**Convert JavaScript objects into TOON format quickly — lightweight, human-readable, and dependency-free.**

[English](#) | [Tiếng Việt](https://github.com/kitmodule/kittoon-js/blob/master/README.vi.md)

[![npm version](https://img.shields.io/npm/v/@kitmodule/kittoon.svg)](https://www.npmjs.com/package/@kitmodule/kittoon)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kitmodule/kittoon-js/blob/master/LICENSE)

## ✨ Features

* 📦 Convert JavaScript objects into **TOON format**: human-readable, lightweight.
* 🔢 Automatic **uniform array**: `[N]{field1,field2,...}:` in inline or block style.
* ⚡ Optional **flatten / fold keys**: flatten nested objects, concatenate keys, or remove `.`.
* 💨 Supports array **inline** `[a,b,c]` or **block** `- a\n- b`.
* 💎 Vanilla JS, **no dependencies**.
* 🔧 Quick helper to convert objects into TOON in a single line: `convertTOON(obj)`.

## 🚀 Installation

### npm

```bash
npm install @kitmodule/kittoon
```

### CDN

```html
<script src="https://unpkg.com/@kitmodule/kittoon/dist/kittoon.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/@kitmodule/kittoon/dist/kittoon.min.js"></script>
```


## 🧪 Example

```js
const data = {
  project: "KitTOON Demo",
  author: {
    name: "Huỳnh Nhân Quốc",
    location: "Tam Kỳ"
  },
  users: [
    { id: 1, name: "Quốc", age: 25 },
    { id: 2, name: "Nam", age: 30 }
  ],
  tags: ["demo", "kitmodule", "TOON"]
};

// Quick conversion to TOON
console.log(convertTOON(data));
```

**Output:**

```
project: KitTOON Demo
author:
  name: Huỳnh Nhân Quốc
  location: Tam Kỳ
users[2]{id,name,age}:
1,Quốc,25
2,Nam,30
tags: [demo,kitmodule,TOON]
```

## 💡 Usage

### Browser (CDN)

```html
<script src="https://unpkg.com/@kitmodule/kittoon-js/dist/kittoon.min.js"></script>
<script>
  const obj = {
    users: [
      { id: 1, name: "Quốc", role: "admin" },
      { id: 2, name: "Nam", role: "user" }
    ]
  };

  // Quick helper
  console.log(convertTOON(obj));

  // Or custom instance
  const toon = new KitTOON(obj)
    .inline()           // enable inline uniform array
    .flatten('user')    // flatten object with prefix 'user'
    .fold(true);        // fold keys (remove dots)

  console.log(toon.convert());
</script>
```

### Node.js / CommonJS

```js
const { KitTOON, convertTOON } = require('@kitmodule/kittoon');

const obj = {
  users: [
    { id: 1, name: "Quốc", role: "admin" },
    { id: 2, name: "Nam", role: "user" }
  ]
};

// Convert object to TOON
const toon = new KitTOON(obj)
  .inline()       // inline uniform array
  .flatten(true)  // flatten object
  .fold(true);    // fold keys

console.log(toon.convert());

// Or use the quick helper
console.log(convertTOON(obj));
```

## 🧩 API Reference

### `new KitTOON(obj)`

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| obj       | object | Plain JavaScript object to convert |

### Instance Methods

| Method                      | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| `.inline(enable = true)`    | Use **inline** array `[1,2,3]` or uniform object inline            |
| `.block(enable = true)`     | Use **block** array `- 1\n- 2`                                     |
| `.convert()`                | Convert the object into TOON string                                |
| `.fold(prefixOrBoolean)`    | Fold keys (remove dots) or use a custom prefix                     |
| `.flatten(prefixOrBoolean)` | Flatten nested object to single-level keys, optionally with prefix |
| `.delimiter(char)`          | Change the delimiter for uniform arrays (default: `,`)             |

### Global Helpers

| Function                     | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| `convertTOON(obj)`           | Quick conversion to TOON format                        |
| `toonFrontMatter(obj, body)` | Convert object to TOON front matter with optional body |



## ✅ Why KitTOON?

* Quickly convert object → TOON for configuration, front matter, test data.
* **Human-readable**, **lightweight**, easy to integrate.
* Provides **quick helper** and **instance customization**.

## ☕ Support the Author

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge\&logo=ko-fi\&logoColor=white)](https://ko-fi.com/huynhnhanquoc)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge\&logo=buy-me-a-coffee\&logoColor=black)](https://buymeacoffee.com/huynhnhanquoc)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-f7f7f7?style=for-the-badge\&logo=githubsponsors\&logoColor=ff69b4\&color=f7f7f7)](https://github.com/sponsors/huynhnhanquoc)

## 🧾 License

Released under [MIT License](https://github.com/kitmodule/kittoon-js/blob/master/LICENSE)
© 2025 [Huỳnh Nhân Quốc](https://github.com/huynhnhanquoc) · Open Source [@Kit Module](https://github.com/kitmodule)
