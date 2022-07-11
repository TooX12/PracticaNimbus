import { Fragment, ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <NavBar />
      <main className="relative">{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
