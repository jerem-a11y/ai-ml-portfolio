import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { profile } from "@/data/profile";
const site = process.env.NEXT_PUBLIC_SITE_URL || "";
export const metadata: Metadata = {
 title:{default:"Jeremiah Adebusoye — Machine Learning Engineer",template:"%s | Jeremiah Adebusoye"},
 description:"Portfolio of Jeremiah Oluwasemilore Adebusoye: machine learning, data science, computer vision, NLP, and intelligent applications.",
 applicationName:"Jeremiah Adebusoye Portfolio",
 metadataBase: site ? new URL(site) : undefined,
 alternates: site ? {canonical:site} : undefined,
 openGraph:{title:"Jeremiah Adebusoye — Building Intelligence From Data",description:"Machine Learning Engineer · Data Scientist · Computer Vision & NLP",type:"website",siteName:"Jeremiah Adebusoye Portfolio"},
 twitter:{card:"summary_large_image",title:"Jeremiah Adebusoye — Machine Learning Engineer",description:"Building predictive models, computer vision applications, and intelligent systems."},
};
export const viewport: Viewport={themeColor:"#080b12",width:"device-width",initialScale:1};
export default function RootLayout({children}:{children:ReactNode}){
 const person={"@context":"https://schema.org","@type":"Person",name:profile.name,jobTitle:"Machine Learning Engineer",email:profile.email,address:{"@type":"PostalAddress",addressLocality:"Akure",addressCountry:"NG"},sameAs:[profile.github,profile.linkedin]};
 return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person)}}/>{children}</body></html>;
}
