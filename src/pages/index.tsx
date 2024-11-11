import { type NextPage } from 'next';

import Layout from '@/components/Layout';
import { IconCard } from '@/components/Molecules/IconCard';

const Home: NextPage = () => {
  return (
    <Layout IsSideBar>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <IconCard />
      </main>
    </Layout>
  );
};

export default Home;
