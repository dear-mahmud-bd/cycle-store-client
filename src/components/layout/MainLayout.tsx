import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 w-full z-10 bg-amber-50">
          <Navbar></Navbar>
        </header>

        <main className="flex-grow mt-20">
          <div className="container max-w-7xl mx-auto p-2">
            <Outlet></Outlet>
          </div>
        </main>

        <footer className="mt-auto w-full bg-customPurple2">
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
