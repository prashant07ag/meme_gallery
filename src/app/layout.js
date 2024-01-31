import "./globals.css";

export const metadata = {
  title: "Meme-Gallery",
  description: "Meme Gallery App fetching reddit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
          <main>
            {children} 
          </main>
      </body>
    </html>
  );
}
