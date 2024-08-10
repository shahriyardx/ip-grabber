import { cn } from "@/lib/utils"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className={cn("min-h-screen bg-border font-sans antialiased dark")}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
