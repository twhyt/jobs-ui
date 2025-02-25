import { AntdRegistry } from "@ant-design/nextjs-registry";
import { HeroProviders } from "./hero-provider";
import { Roboto } from "next/font/google";
import "@/styles/global.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
