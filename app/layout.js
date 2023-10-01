import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

export const metadata = {
  title: "CSS Filter Online",
  description: "Choose best CSS filters to an image in a simple way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
