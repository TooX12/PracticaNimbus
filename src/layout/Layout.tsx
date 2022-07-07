import { Fragment, ReactNode } from "react";
import NavBar from "../components/NavBar/NavBar";

function Layout({ children }: {children:ReactNode}) {

  return (
      <Fragment>
        <NavBar />
        <main>{children}</main>
      </Fragment>
  );
}

export default Layout;