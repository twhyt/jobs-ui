# Job Solution UI Framework Theme

## 📌 Overview
Job Solution UI Framework Theme เป็นชุด UI ที่ออกแบบมาเพื่อให้การพัฒนาเว็บของระบบ Job-Solution

## ✨ Features
- 🎨 **Customizable Themes** – ปรับแต่งสี ฟอนต์ และองค์ประกอบต่าง ๆ ได้อย่างง่ายดาย
- 📱 **Responsive Design** – รองรับทุกขนาดหน้าจอ
- ⚡ **Optimized Performance** – โหลดเร็ว ใช้งานลื่นไหล
- 🛠 **Component-Based** – มี UI Components พร้อมใช้ เช่น Buttons, Cards, Modals, และอื่น ๆ
- 🌙 **Dark Mode Support** – รองรับโหมดมืด

## 📦 Installation
```sh
npm install jobsolution-ui
```

หรือถ้าใช้ Yarn:
```sh
yarn add jobsolution-ui
```

## 🚀 Usage
```tsx
import { Button } from 'jobsolution-ui';

function App() {
  return <Button>Click Me</Button>;
}
```

## 🔗 Examples
สามารถดูตัวอย่างและเอกสารเพิ่มเติมได้ที่ [Documentation](https://example.com/docs)

## 💡 Customization
สามารถปรับแต่งธีมโดยใช้ไฟล์ CSS Variables หรือ Theme Provider ได้
```tsx
import { ThemeProvider } from 'jobsolution-ui';

<ThemeProvider theme={{ primaryColor: '#ff5733' }}>
  <App />
</ThemeProvider>
```

## 📄 License
```txt
MIT License
```

---
หากต้องการดูตัวอย่าง UI Framework อื่น ๆ สามารถศึกษาได้จาก:
```txt
- Material-UI: https://mui.com/
- Tailwind CSS: https://tailwindcss.com/
- Chakra UI: https://chakra-ui.com/
- Ant Design: https://ant.design/
```

