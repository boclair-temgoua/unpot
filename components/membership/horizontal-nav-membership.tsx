import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { NavbarProps } from '../layouts/dashboard/vertical-nav-dashboard';

const HorizontalNavMembership = () => {
  const { userStorage: user } = useInputState();
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: 'Memberships',
      href: '/memberships',
    },
    {
      title: 'Levels',
      href: '/memberships/levels',
    },
    // {
    //     title: "Settings",
    //     href: "/memberships/settings",
    // }
  ]);

  return (
    <>
      {/* <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-[#121212]">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`group inline-flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? bgColor
                    : `text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700`
                } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div> */}

      <div className="border-b border-gray-200 dark:border-b-gray-600">
        <nav className="flex flex-wrap gap-4 space-x-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                    : 'border-transparent hover:border-gray-300'
                } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export { HorizontalNavMembership };
