import { logoutUsersAPI } from '@/api-site/user';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useCanonicalUrl, useInputState } from '@/components/hooks';
import { ButtonInput, ImageLogo, ThemeToggle } from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoveLeftIcon } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export type NewAmountType = {
  country: string;
  quantity?: number;
  currency: string;
  value: number;
  price: number;
  oneValue: number;
};

export const paymentMethodArray = [
  {
    name: 'Bank card',
    value: 'STRIPE',
    image: <FaCreditCard className="size-6" />,
  },
  {
    name: 'PayPal',
    value: 'PAYPAL',
    image: <FaPaypal className="size-6" />,
  },
];

const LayoutCheckoutSite = ({ children, title }: IProps) => {
  const canonicalUrl = useCanonicalUrl();
  const { t, userStorage: userVisiter } = useInputState();
  const { back, push } = useRouter();

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login`);
    location.reload();
  };

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_NAME_SITE}
          key="title"
        />
        <meta
          name="description"
          content={`Checkout tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
        />
        {process.env.NEXT_ENV === 'prod' && (
          <link rel="canonical" href={canonicalUrl} />
        )}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <div className="bg-gray-50 py-8 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         
        </div>
      </div> */}

      <header className="items-center gap-4 border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-[#04080b]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button type="button" variant="ghost">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              <Link href="/">
                <div className="flex shrink-0 items-center">
                  <div className="block h-8 w-auto lg:hidden">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <ImageLogo />
                      </div>

                      {/* <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="hidden h-8 w-auto lg:block">
                    {/* <div className="flex items-center">
                    <div
                      onClick={() => push('/')}
                      className="relative shrink-0 cursor-pointer"
                    >
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div> */}
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <ImageLogo />
                      </div>

                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="ml-auto flex items-center justify-end space-x-2">
              <div className="flex items-center">
                <div className="relative">
                  <ButtonInput
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      back();
                    }}
                    icon={<MoveLeftIcon className="size-4" />}
                  >
                    Come back
                  </ButtonInput>
                </div>
                <ThemeToggle />
                {userVisiter?.id ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="-m-3">
                          <svg
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/orders`)}>
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'MENU.ORDER' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/settings`)}>
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'MENU.SETTING' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <span className="cursor-pointer">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 dark:bg-black/15">
        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
        >
          <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
            <main>{children}</main>
            <MediumFooter />
          </div>
        </div>
      </div>
      {/* <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="bg-gray-50 py-8 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-6 max-w-6xl md:mt-12">{children}</div>
        </div>
      </div> */}
    </>
  );
};

export { LayoutCheckoutSite };