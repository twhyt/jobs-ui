import type { Metadata } from "next";
import "../styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { HeroProviders } from "./hero-provider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Job Solution - UI",
  description: "Job Solution - UI for frontend team in edvisory.co.th",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <AntdRegistry>
          <HeroProviders>{children}</HeroProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
