import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import { generatePhotographyPortfolioStructuredData } from "@/lib/seo";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SimpleNavigation } from "@/components/SimpleNavigation";
import { Footer } from "@/components/Footer";

const ibmPlexMono = IBM_Plex_Mono({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "FILMRICK",
	description: "Film photography from Mexico City",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const structuredData = generatePhotographyPortfolioStructuredData();

	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body
				className={`min-h-screen bg-white antialiased ${ibmPlexMono.className}`}
				suppressHydrationWarning={true}
			>
				<LanguageProvider>
					<SimpleNavigation />
					<main className="pt-28">{children}</main>
					<Footer />
				</LanguageProvider>
			</body>
		</html>
	);
}
