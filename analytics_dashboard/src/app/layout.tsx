import "./globals.css";
import { Container } from "../components/ui/container";

export const metadata = {
  title: "SRE Copilot",
  description: "Painel SRE Copilot – Monitoramento e recomendações.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
