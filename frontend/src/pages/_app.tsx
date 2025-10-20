import { AuthUserProvider } from "@/context/AuthUserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer, Flip } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
    return (
      <AuthUserProvider>
          <>
            <ToastContainer
                  position="top-center"
                  autoClose={8000}
                  transition={Flip}
            />
            <Component {...pageProps} />;
          </>
      </AuthUserProvider>
    )
}