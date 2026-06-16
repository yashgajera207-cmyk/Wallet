import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">
        <Web3Provider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </Web3Provider>
      </body>
    </html>
  );
}
