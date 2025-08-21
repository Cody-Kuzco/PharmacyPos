import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { Toaster } from "react-hot-toast";
import MainLayout from "../components/MainLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharmacy Pos Sytsem",
  description: "Point of sale system for pharmacy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <MainLayout>{children}</MainLayout>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#000",
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
