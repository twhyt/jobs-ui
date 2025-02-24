import { Button } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    type: "secondary",
  },
};
