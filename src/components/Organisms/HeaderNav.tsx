import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { MenuList } from '@/components/Molecules/MenuList';
import { formatDate } from '@/utils/day';

interface HeaderNavProps {
  IsDate?: boolean;
  IsMenu?: boolean;
  slug: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ IsMenu, IsDate, slug }) => {
  return (
    <header className="glass-card fixed top-0 z-10 h-20 w-full items-center rounded-lg">
      <ul className="flex h-20 w-full items-center justify-around px-12 text-center text-2xl">
        <li className="basis-1/3">
          <Link href={slug}>
            <ChevronLeftIcon className="h-10 w-10" />
          </Link>
        </li>
        <li className={`basis-1/3 ${IsDate ? '' : 'invisible'}`}>
          {formatDate(new Date(), 'YYYY/MM/DD')}
        </li>
        <li className={`flex basis-1/3 justify-end ${IsMenu ? '' : 'invisible'}`}>
          <MenuList />
        </li>
      </ul>
    </header>
  );
};
