"use client";
import { Header } from "./header";
import { Footer } from "./footer";
import { PropsWithChildren } from "react";
import { NextUIProvider, ThemeProvider } from "x-react/providers";
import { QueryProvider } from "@/providers/QueryProvider";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <ThemeProvider disableTransitionOnChange={true}>
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
