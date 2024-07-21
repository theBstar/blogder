import StyledComponentsRegistry from "@/app/AntdRegistry";
import DevelopmentHeader from "@/components/DevelopmentHeader";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const inter = Lato({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Wonderful blog posts about all things web development.",
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
          <DevelopmentHeader />
          <main style={{ width: '80%', margin: '0px auto' }}>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
