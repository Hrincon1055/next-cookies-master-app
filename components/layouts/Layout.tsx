import React, { FC, ReactNode } from "react";
import Head from "next/head";
// MIS COMPONENTES
import { Navbar } from "../ui";
// INTERFACE
interface Props {
  children: ReactNode;
}
// INICIO
export const Layout: FC<Props> = ({ children }) => {
  // RENDER
  return (
    <>
      {/* <Head></Head> */}
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: "20px 50px" }}>{children}</main>
    </>
  );
};
