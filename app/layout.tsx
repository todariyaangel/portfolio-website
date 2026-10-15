import './globals.css';

export const metadata = {
  title: 'Angel Todariya | Portfolio',
  description: 'Data Science & AI Student at IIT Guwahati',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#080808', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}