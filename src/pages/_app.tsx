import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
      <ToastContainer bodyClassName="font-mono"/>
      <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
