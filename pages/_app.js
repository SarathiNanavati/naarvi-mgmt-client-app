import "../styles/globals.css";
import Head from "next/head";
import DefaultLayout from "../src/components/layouts/defaultLayout";

import { store } from "../src/store/store";
import { Provider as ReduxStoreProvider } from "react-redux";
import { resetStatus, tryLocalSignin } from "../src/features/usersSlice";
import {
  showFrameHandler,
  hideFrameHandler,
} from "../src/features/layoutsSlice";
import { Provider as InventoryProvider } from "../src/context/InventoryContext";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxStoreProvider store={store}>
      <InventoryProvider>
        <DefaultLayout>
          <Head>
            <link rel='shortcut icon' href='/icons/favicon.ico' />
          </Head>
          <Component {...pageProps} />
        </DefaultLayout>
      </InventoryProvider>
    </ReduxStoreProvider>
  );
}

export default MyApp;
