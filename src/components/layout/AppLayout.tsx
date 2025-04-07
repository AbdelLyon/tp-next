"use client";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header } from "./header";
import { Footer } from "./footer";
import { PropsWithChildren } from "react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </QueryProvider>
  );
};
