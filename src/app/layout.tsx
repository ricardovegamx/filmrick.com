import "./globals.css";
import "@fontsource/iosevka-etoile/400.css";
import "@fontsource/iosevka-etoile/500.css";
import "@fontsource/iosevka-etoile/600.css";
import "@fontsource/iosevka-etoile/700.css";
import "@fontsource/iosevka-etoile/400-italic.css";
import { Merriweather, Crimson_Text } from "next/font/google";
import { generatePhotographyPortfolioStructuredData } from "@/lib/seo";
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
	description: "Portfolio de fotografía en película - Explorando momentos auténticos a través del arte analógico",
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
				<SimpleNavigation />
				<main className="pt-28">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
