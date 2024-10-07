"use client";
import {ThemeProvider as NextThemesProvider} from "next-themes";
export default function ThemeProvider({children}: {children: React.ReactNode}, ...props: any[]) {
  return <NextThemesProvider {...props}>
    {children}
    </NextThemesProvider>;
}