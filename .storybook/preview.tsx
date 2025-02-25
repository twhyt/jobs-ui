import React from "react";
import type { Preview } from "@storybook/react";
import { Roboto } from "next/font/google";
import "../src/styles/global.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={`${roboto.className}`}>
        <Story />
      </main>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
