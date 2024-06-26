import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "../context";
import Sidebar from "../component/sidebar"; 
import Headers from "../component/header"; 
import NextAuthProvider from "@/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
     <NextAuthProvider><GlobalContextProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Headers />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </GlobalContextProvider></NextAuthProvider>
        
      
    </body>
  </html>

  );
}
