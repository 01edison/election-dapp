import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider
        initializeOnMount={true}
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
