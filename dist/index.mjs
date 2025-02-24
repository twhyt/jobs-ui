// src/components/Button.tsx
import React from "react";
import { Button as AntButton } from "antd";
var Button = ({ label, type = "primary", onClick }) => {
  return /* @__PURE__ */ React.createElement(AntButton, { type, onClick }, label);
};
var Button_default = Button;
export {
  Button_default as Button
};
//# sourceMappingURL=index.mjs.map