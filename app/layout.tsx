import "./globals.css";

export const metadata = {
  title: "Nabo Stream",
  description: "Шилдэг кинонуудыг эндээс",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="antialiased bg-netflix-black text-white">
        {children}
      </body>
    </html>
  );
}