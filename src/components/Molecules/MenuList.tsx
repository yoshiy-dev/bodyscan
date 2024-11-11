import { Menu, Transition } from '@headlessui/react';
import { CameraIcon, EllipsisHorizontalCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import { imageNumberAtom } from '@/utils/Atom';

type menuProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

export const MenuList = (): JSX.Element => {
  const router = useRouter();
  const imageNumber = useRecoilValue(imageNumberAtom);
  const menus: menuProps[] = [
    {
      label: 'Retake Phote',
      href: '/camera',
      icon: <CameraIcon className="mr-3 h-8 w-8" aria-hidden="true" />,
    },
    {
      label: 'Edit Points',
      href: '/camera/edit',
      icon: <PencilIcon className="mr-3 h-8 w-8" aria-hidden="true" />,
    },
  ];

  const handleClick = (href: string) => {
    const userId = router.query.userId as string;
    const queryParams = `?userId=${userId}&imageNumber=${imageNumber + 1}`;
    void router.push(href + queryParams);
  };

  return (
    <Menu>
      <Menu.Button>
        <EllipsisHorizontalCircleIcon className="h-12 w-12" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute -right-10 mt-[72px] w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-2 focus:outline-none">
          {menus.map((menu) => (
            /* Use the `active` state to conditionally style the active item. */
            <Menu.Item key={menu.label} as={Fragment}>
              {({ active }) => (
                <button
                  onClick={() => handleClick(menu.href)}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md p-2`}
                >
                  {menu.icon}
                  {menu.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

// const menus: menuProps[] = [
//   {
//     label: 'Retake Phote',
//     href: '/camera',
//     icon: <CameraIcon className="mr-3 h-8 w-8" aria-hidden="true" />,
//   },
//   {
//     label: 'Discription',
//     href: '/',
//     icon: <InformationCircleIcon className="mr-3 h-8 w-8" aria-hidden="true" />,
//   },
//   {
//     label: 'Edit Points',
//     href: '/camera/edit',
//     icon: <PencilIcon className="mr-3 h-8 w-8" aria-hidden="true" />,
//   },
// ];
