import type { Metadata } from "next";
import Navbar from "../ui/navbar";
import { Footer } from "../ui/Footer";
 
export const metadata: Metadata = {
  title: "Basheer Nizami",
  description: "Official website of Basheer Nizami",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    <Navbar/>
 {children}
 <Footer/>
   </div>
)}
