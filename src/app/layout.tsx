import "./globals.css";
import { Merriweather, Crimson_Text } from "next/font/google";
import { generatePhotographyPortfolioStructuredData } from "@/lib/seo";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SimpleNavigation } from "@/components/SimpleNavigation";
import { Footer } from "@/components/Footer";

const merriweather = Merriweather({
	weight: ["300", "400", "700", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-merriweather",
});

const crimsonText = Crimson_Text({
	weight: ["400", "600", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-crimson",
});

export const metadata = {
	title: "FILMRICK",
	description: "Fotografía analógica desde Ciudad de México",
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
				className={`min-h-screen bg-white antialiased ${merriweather.variable} ${crimsonText.variable}`}
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
