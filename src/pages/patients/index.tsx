import { type NextPage } from 'next';

import PageTitle from '@/components/atoms/PageTitle';
import Layout from '@/components/Layout';
import { PatientTable } from '@/components/Molecules/PatientTable';
import SearchBox from '@/components/Molecules/SearchBox';

const Patients: NextPage = () => {
  return (
    <Layout IsSideBar>
      <div className="flex h-screen touch-none flex-col justify-between gap-6 px-8 pt-16">
        <PageTitle>患者一覧</PageTitle>
        <SearchBox />
        <PatientTable IsLink />
      </div>
    </Layout>
  );
};

export default Patients;
