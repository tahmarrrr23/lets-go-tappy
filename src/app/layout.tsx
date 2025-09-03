import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Let's Go Tappy",
    default: "Let's Go Tappy",
  },
  description: "Testing the usability of the Tappy NPM package.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme
          radius="large"
          appearance="dark"
          accentColor="pink"
          grayColor="mauve"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
