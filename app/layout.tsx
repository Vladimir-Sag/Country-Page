import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Logo from "../public/Logo.svg";
import heroImageSm from "../public/hero-image-sm.webp";
import heroImageLg from "../public/hero-image.webp";
const beVietnamPro = Be_Vietnam_Pro({
  weight: ["500", "600", "700"],
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Country Ranking",
  description: "World countries ranked by population and area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${beVietnamPro.className}  h-full antialiased`}>
      <body
        className="min-h-screen relative bg-brand-gray-900 text-brand-gray-200 
      m-0 grid  items-start grid-rows-[auto_1fr]"
      >
        <header className="mt-11.5 mb-23 text-center lg:mt-26.5 h-fit">
          <Image src={Logo} alt="Logo" priority className="inline-block" />
        </header>
        <div className="absolute top-0 left-0 w-full h-75 -z-10">
          <div className="block lg:hidden relative h-full w-full">
            <Image
              src={heroImageSm}
              alt=""
              placeholder="blur"
              role="presentation"
              quality={75}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden lg:block relative h-full w-full">
            <Image
              src={heroImageLg}
              alt=""
              role="presentation"
              fill
              sizes="100vw"
              quality={75}
              className="object-cover"
            />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
