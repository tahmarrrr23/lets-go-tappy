import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark">{children}</Theme>
      </body>
    </html>
  );
}
