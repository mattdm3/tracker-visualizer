import { ClientLayout } from './ClientLayout';
import './globals.css';

import SupabaseProvider from './utils/supabase-provider';
import NavBar from './NavBar';

// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: 'Tracker-Visualizer',
  description: 'Customizable daily and hourly tracker with great visuals',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <SupabaseProvider>
          <ClientLayout>
            <NavBar />
            {children}
          </ClientLayout>
        </SupabaseProvider>
      </body>
    </html>
  );
}
