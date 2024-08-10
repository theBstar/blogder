import StyledComponentsRegistry from "@/app/AntdRegistry";
import config from "@/config";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const inter = Lato({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.blogMeta.title,
  description: config.blogMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <main style={{ width: '80%', margin: '0px auto' }}>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
