/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */

import { HeaderNav } from '@/components/Organisms/HeaderNav';
import NavBar from '@/components/Organisms/NavBar';

interface LayoutProps {
  IsSideBar?: boolean;
  IsHeaderNav?: boolean;
  IsDate?: boolean;
  IsMenu?: boolean;
  slug?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  IsSideBar,
  IsHeaderNav,
  IsDate,
  IsMenu,
  slug,
  children,
}) => {
  return (
    <div
      className={`z-50 flex h-screen  bg-gradient-to-br from-primary to-primary-focus text-slate-700 ${
        IsHeaderNav ? 'flex-col' : ''
      }`}
    >
      {IsSideBar && <NavBar />}
      {IsHeaderNav && slug ? (
        IsDate ? (
          IsMenu ? (
            <HeaderNav slug={slug} IsDate IsMenu />
          ) : (
            <HeaderNav slug={slug} IsDate />
          )
        ) : (
          <HeaderNav slug={slug} />
        )
      ) : (
        <></>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
