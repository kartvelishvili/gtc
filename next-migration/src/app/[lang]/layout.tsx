import type { Metadata } from "next";
import "../globals.scss";
import "../../styles/gtc-design-system.scss";
import localFont from "next/font/local";
import { Darker_Grotesque, Noto_Sans_Georgian } from "next/font/google";
import GtcHeader from "@/components/GtcHeader/GtcHeader";
import GtcFooter from "@/components/GtcFooter/GtcFooter";
import { getDictionary } from "@/app/dictionaries/dictionaries";

const dejavuSans = localFont({
  src: [
    {
      path: "../../../public/fonts/DejaVuSans.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/DejaVuSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/DejaVuSans-BoldOblique.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/DejaVuSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/DejaVuSans-Oblique.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dejavu-sans",
});

const notoSansGeorgianSemiCondensed = localFont({
  src: [
    {
      path: "../../../public/fonts/NotoSansGeorgian-SemiCondensed.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-notoSansGeorigan-SemiCondensed",
});

const inder = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-darker-grotesque",
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin", "georgian"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-notoSansGeorgian",
});

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-darkerGrotesque",
});

export const metadata: Metadata = {
  title: {
    default: "GTC Group — საყალიბე სისტემები და სამშენებლო გადაწყვეტილებები",
    template: "%s | GTC Group",
  },
  description:
    "GTC Group — DOKA-ს ოფიციალური პარტნიორი საქართველოში. საყალიბე სისტემები, საინჟინრო მომსახურება, კონსულტაცია და აღჭურვილობის გაქირავება.",
  keywords: ["GTC Group", "DOKA", "formwork", "construction", "Georgia", "საყალიბე", "სამშენებლო"],
  openGraph: {
    siteName: "GTC Group",
    type: "website",
    locale: "ka_GE",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)) as any;

  return (
    <html lang={lang === "ka" ? "ka" : lang}>
      <body
        className={`${dejavuSans.variable} ${notoSansGeorgianSemiCondensed.variable} ${notoSansGeorgian.variable} ${darkerGrotesque.variable} antialiased`}
      >
        <GtcHeader dict={dictionary} locale={lang} />
        <main id="main-content">
          {children}
        </main>
        <GtcFooter dict={dictionary} locale={lang} />
      </body>
    </html>
  );
}
