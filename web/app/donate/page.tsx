import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import TerminalDonate from "@/src/components/TerminalDonate";

export default function DonatePage() {
  return (
    <>
      <Navbar />
    <div className="container px-4 py-12 flex w-full justify-center items-center gap-8">
      <TerminalDonate />
    </div>
      <Footer/>
    </>
  )
}