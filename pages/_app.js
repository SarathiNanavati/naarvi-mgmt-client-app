import "../styles/globals.css";
import Head from "next/head";
import DefaultLayout from "../src/components/layouts/defaultLayout";
import { Provider as UserProvider } from "../src/context/UserContext";
import { Provider as NotificationProvider } from "../src/context/NotificationContext";
import { Provider as LayoutProvider } from "../src/context/LayoutContext";
import { Provider as InventoryProvider } from "../src/context/InventoryContext";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <NotificationProvider>
        <UserProvider>
          <InventoryProvider>
            <DefaultLayout>
              <Head>
                <link rel='shortcut icon' href='/icons/favicon.ico' />
              </Head>
              <Component {...pageProps} />
            </DefaultLayout>
          </InventoryProvider>
        </UserProvider>
      </NotificationProvider>
    </LayoutProvider>
  );
}

export default MyApp;
