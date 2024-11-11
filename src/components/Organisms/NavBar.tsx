import {
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import {
  ClipboardDocumentListIcon as ClipboardSolid,
  HomeIcon as HomeSolid,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const NavBar = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="glass-card flex h-screen w-20 flex-col  rounded-3xl">
      {/* icon */}
      <div className=" basis-1/3 py-4" onClick={() => void signIn()}>
        <Image
          src={'/manifest/icon.svg'}
          width={50}
          height={50}
          alt="Picture of the author"
          className="mx-auto"
        />
      </div>

      <ul className="flex flex-col gap-10">
        <li>
          <Link href={'/'}>
            <div className="">
              {router.pathname === '/' ? (
                <HomeSolid className="mx-auto h-12 w-12" />
              ) : (
                <HomeIcon className="mx-auto h-12 w-12" />
              )}
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/patients'}>
            <div className="">
              {router.pathname === '/patients' ? (
                <ClipboardSolid className="mx-auto h-12 w-12" />
              ) : (
                <ClipboardDocumentListIcon className="mx-auto h-12 w-12" />
              )}
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <div className="">
              <FolderIcon className="mx-auto h-12 w-12" />
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <div className="">
              <Cog6ToothIcon className="mx-auto h-12 w-12" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
