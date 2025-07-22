import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "@/css/global.css";

export const metadata = {
  title: "每月營收",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
