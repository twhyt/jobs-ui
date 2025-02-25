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
    variants: "primary",
    disabled: false,
    size: "medium",
    danger: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variants: "secondary",
    disabled: false,
    size: "medium",
    danger: false,
  },
};

export const Dashed: Story = {
  args: {
    children: "Dashed",
    variants: "dashed",
    disabled: false,
    size: "medium",
    danger: false,
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variants: "link",
    disabled: false,
    size: "medium",
    danger: false,
  },
};

export const Text: Story = {
  args: {
    children: "Text",
    variants: "text",
    disabled: false,
    size: "medium",
    danger: false,
  },
};
