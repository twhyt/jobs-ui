# 🧑‍💻 Frontend Code Style Guide (Next.js)

เอกสารนี้เป็นแนวทางมาตรฐานสำหรับทีม Frontend

## Story Book Setup

### Yarn

```text
    yarn
    yarn dev
```

### Pnpm

```text
    pnpm i
    pnpm run dev
```

## เมื่อลงเสร็จแล้วกับ run โปรเจคแล้วให้เช็ค story จาก  port 6006 (Default)

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
my-app/
├── app/                # สำหรับ Next.js App Router
│   └── page.tsx       # หน้าเพจหลัก
├── components/        # Component ที่ใช้ซ้ำได้
├── features/          # Feature-based structure
│   └── auth/
│       ├── hooks/
│       ├── components/
│       └── services.ts
├── lib/               # Utils หรือ helper ทั่วไป
├── styles/            # CSS หรือ SCSS (ถ้ามี)
├── public/            # Static assets
├── types/             # Global types หรือ interfaces
├── hooks/             # Custom React Hooks
├── constants/         # ค่าคงที่ เช่น enums, keys
├── middleware.ts      # Next.js middleware
└── next.config.js     # Next.js config
```

---

## 🧾 Code Style

### ✅ ใช้ TypeScript เสมอ

```ts
// ❌ หลีกเลี่ยง
function sum(a, b, c) {
  return a + b + c;
}

// ✅ ควรใช้ให้คนอื่นรู้ว่าตัวแปรนี้ควรเป็น type อะไร
// ✅ หากตัวแปรไหนไม่จำเป็นต้อง Require ให้ใส่ "?" ต่อท้ายเผื่อไว้เช่น C
function sum(a: number, b: number, c?:number): number {
  return a + b + c;
}
```

### ✅ ใช้ `function component` แบบ arrow function

```tsx
// ✅ ใช้ arrow function
const ProfileCard = () => {
  return <div>Profile</div>;
};
```

### ✅ ตั้งชื่อ component เป็น PascalCase และไฟล์เป็น kebab-case

```tsx
// 🔍 components/user-card.tsx

const UserCard = () => { ... };
export default UserCard;
```

### ✅ ใช้ `import type` กับ type/interface

```ts
import type { User } from '@/types/user';
```

---

## 🎨 Styling

### ✅ ใช้ SCSS และ Tailwind CSS เป็นหลัก

* อย่าใช้ CSS-in-JS (inline) ถ้าไม่จำเป็น

```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
  Click me
</button>
```

### ✅ สร้าง component แยกถ้าความซับซ้อนเกิน หรือไฟล์เขียนเกิน 200-300 บรรทัด

```tsx
// ❌ อย่ายัด UI logic ทุกอย่างไว้ใน page
// ✅ ย้ายไปยัง component เพื่อความ readable
```

---

## ⚙️ State Management

* ใช้ **React Context** สำหรับ global state ที่เรียบง่าย
* ใช้ **Redux Toolkit** สำหรับจัดการ state ที่ซับซ้อนหรือแชร์หลายหน้า

---

## 🚦 Naming Convention

* `camelCase` → สำหรับตัวแปร, ฟังก์ชัน
* `PascalCase` → สำหรับ React component
* `UPPER_CASE_SNAKE` → สำหรับ constants
* `kebab-case` → สำหรับชื่อไฟล์และโฟลเดอร์

---

## 🧪 Testing

รอ Update

---

## 🛡️ Code Quality

* ✅ ใช้ ESLint + Prettier + TypeScript
<!-- * ✅ ใช้ Husky + lint-staged สำหรับ pre-commit checks -->
* ✅ ใช้ commit message แบบ Conventional Commits

.eslintrc.json

```text
{
  "plugins": ["@typescript-eslint"],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-unknown-property": ["error", { "ignore": ["jsx", "global"] }],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@definitelytyped/no-unnecessary-generics": "off"
  }
}
```

---

## 📦 การใช้งาน 3rd Party

* ให้ใช้ open-source libraries ที่มีผู้ใช้จำนวนมากและ actively maintained เท่านั้น
* ถ้าใช้ external UI library เช่น Radix, ให้ wrap เป็น component ของทีมก่อนใช้

---

## ✅ ตัวอย่าง Component มาตรฐาน

```tsx
'use client';
import { Button } from '@/components/ui/button';

type Props = {
  name: string;
};

export const WelcomeCard = ({ name }: Props) => {
  return (
    <div className="p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold">Hello, {name}!</h2>
      <Button className="mt-2">Get Started</Button>
    </div>
  );
};
```

---

## 📚 Resources ไว้อ่าน

* [Next.js Docs](https://nextjs.org/docs)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [ESLint + Prettier Config](https://github.com/prettier/eslint-config-prettier)

* [AntD](https://ant.design/)
* [Redux Toolkit](https://redux-toolkit.js.org/)

---
