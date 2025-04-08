"use client";
import { ClientQueryProvider } from "@/providers/ClientQueryProvider";
import { Header } from "./header";
import { Footer } from "./footer";
import { PropsWithChildren } from "react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClientQueryProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </ClientQueryProvider>
  );
};
