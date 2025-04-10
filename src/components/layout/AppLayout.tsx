"use client";
import { ClientQueryProvider } from "@/providers/ClientQueryProvider";
import { Header } from "./header";
import { Footer } from "./footer";
import { PropsWithChildren } from "react";
import { NextUIProvider, ThemeProvider } from "x-react/providers";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClientQueryProvider>
      <NextUIProvider>
        <ThemeProvider disableTransitionOnChange={true}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </NextUIProvider>
    </ClientQueryProvider>
  );
};
