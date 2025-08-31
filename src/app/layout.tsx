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
        <Theme
          radius="full"
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
