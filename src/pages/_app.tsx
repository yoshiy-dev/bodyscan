/* eslint-disable tailwindcss/no-custom-classname */
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/Layout';
import { api } from '@/utils/api';

import '@/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </RecoilRoot>
  );
};

export default api.withTRPC(MyApp);

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { data: sessionData } = useSession();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!sessionData?.user) return;
    if (sessionData?.user.role === 'ADMIN') setAuth(true);
    if (sessionData?.user.role === 'USER') alert('管理者のアカウントでログインしてください');
  }, [sessionData]);

  return (
    <>
      {auth ? (
        children
      ) : (
        <Layout IsSideBar>
          <main className="flex min-h-screen flex-col items-center justify-center">
            <button className="btn-outline btn text-black" onClick={() => void signIn()}>
              管理者ログイン
            </button>
          </main>
        </Layout>
      )}
    </>
  );
};
