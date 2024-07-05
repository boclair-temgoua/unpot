'use client';

import { GetOneProductAPI } from '@/api-site/product';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  LayoutCheckoutSite,
  NewAmountType,
  paymentMethodArray,
} from '@/components/layouts/checkout';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { ListCarouselProductUpload } from '@/components/shop/list-carousel-product-upload';
import { ProductCheckoutSkeleton } from '@/components/skeleton/product-checkout-skeleton';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent } from '@/components/ui-setting/ant';
import { CreateOrUpdateUserAddressForm } from '@/components/user-address/create-or-update-user-address-form';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';

const schema = yup.object({
  paymentMethod: yup.string().required('payment method is a required field'),
});

const CheckoutProduct = () => {
  const { query, push } = useRouter();
  const { id: productId, username, affiliate } = query;
  const { userStorage: userBayer, ipLocation } = useInputState();
  const { isValid, watch, register } = useReactHookForm({
    schema,
  });
  const watchPaymentMethod = watch('paymentMethod', null);

  const { data: userAddress } = GetOneUserAddressMeAPI();
  const [isEdit, setIsEdit] = useState(userAddress?.isUpdated);

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: item,
  } = GetOneProductAPI({
    enableVisibility: 'TRUE',
    productId: String(productId),
    buyerId: userBayer?.organizationId,
  });

  const calculatePrice = Number(item?.priceDiscount);
  const newAmount: NewAmountType = {
    quantity: 1,
    price: calculatePrice,
    currency: item?.currency?.code,
    value: calculatePrice,
    country: ipLocation?.countryCode,
    oneValue: Number(calculatePrice),
  };

  return (
    <>
      <LayoutCheckoutSite title={`Checkout shop`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
            {isLoadingProduct ? (
              <ProductCheckoutSkeleton />
            ) : (
              <>
                <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">
                    <div className="my-8 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
                      <div className="p-8 sm:px-8 sm:py-7">
                        <div className="flow-root">
                          <ListCarouselProductUpload
                            data={item}
                            uploads={item?.uploadsImages}
                            folder="product"
                            height={250}
                            className={`object-cover transition-all duration-200 group-hover:scale-110 ${
                              item?.isUnlock !== 1 ? 'blur-2xl' : ''
                            }`}
                            //className={`object-cover blur-2xl transition-all duration-200 group-hover:scale-110`}
                            // className={`object-cover ${
                            //   item?.isUnlock === 'MEMBERSHIP' &&
                            //   item?.isUnlock !== 1
                            //     ? 'blur-xl'
                            //     : ''
                            // }`}
                          />
                        </div>
                        {item?.title ? (
                          <div className="my-2 text-lg font-bold">
                            {item?.title ?? ''}b
                          </div>
                        ) : null}
                        {/* <div className="relative mt-4 shrink-0 cursor-pointer">
                            <div className="flex items-center">
                              <div className="flex shrink-0 items-center font-bold">
                                {Number(newAmount?.value) > 0 ? (
                                  <>
                                    <span className="ml-1 text-xl">
                                      {formatePrice({
                                        currency: newAmount?.currency,
                                        value: Number(newAmount?.value ?? 0),
                                        isDivide: false,
                                      })}
                                    </span>
                                  </>
                                ) : (
                                  <span className="ml-1 text-xl">Free</span>
                                )}
                              </div>
                            </div>
                          </div> */}

                        <hr className="mt-8 dark:border-gray-800" />
                        <div className="py-4">
                          <div className="flex items-center">
                            <h2 className="text-base font-bold">Contact</h2>
                            {userAddress?.isUpdated &&
                              userAddress?.street1 &&
                              userAddress?.city &&
                              userAddress?.country && (
                                <ButtonInput
                                  type="button"
                                  size="sm"
                                  variant={isEdit ? 'info' : 'outline'}
                                  onClick={() => setIsEdit((i: boolean) => !i)}
                                  className="ml-auto"
                                >
                                  {isEdit ? 'Edit address' : 'Cancel'}
                                </ButtonInput>
                              )}
                          </div>
                        </div>
                        <CreateOrUpdateUserAddressForm
                          isEdit={isEdit}
                          setIsEdit={setIsEdit}
                          userAddress={userAddress}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                  <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
                    <div className="p-2">
                      <div className="mb-2 flex items-center">
                        <AvatarComponent
                          size={40}
                          className="size-10 shrink-0 rounded-full border"
                          profile={item?.profile}
                        />

                        <div className="ml-2 cursor-pointer">
                          <p className="text-sm font-bold">
                            {item?.profile?.firstName ?? ''}
                            {item?.profile?.lastName ?? ''}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            Checkout
                          </p>
                        </div>

                        {/* <div className="ml-auto">
                            <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                              <Link
                                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                href={`/${username}/shop`}
                              >
                                Continue Shopping
                              </Link>
                            </p>
                          </div> */}
                        <ButtonInput
                          type="button"
                          size="sm"
                          variant="info"
                          className="ml-auto"
                        >
                          <Link href={`/${item?.profile?.username}/shop`}>
                            Shopping
                          </Link>
                        </ButtonInput>
                      </div>
                    </div>

                    <div className="p-2 sm:p-4 lg:p-4">
                      <h3 className="font-bold dark:text-white">Riepilogo</h3>

                      <li className="mb-4 flex items-center justify-between text-sm">
                        <p className="dark:text-gray-600">Summary</p>

                        {newAmount?.value ? (
                          <>
                            <p className="ml-1 text-sm dark:text-gray-400">
                              {formatePrice({
                                currency: newAmount?.currency,
                                value: Number(newAmount?.value),
                                isDivide: false,
                              }) ?? ''}
                            </p>
                          </>
                        ) : (
                          'Free'
                        )}
                      </li>

                      {/* <hr className="my-4 dark:border-gray-800" />

                  <li className="flex items-center justify-between text-sm">
                    <p className="dark:text-gray-600">Commissioni di servizio</p>
                    <p className="ml-auto dark:text-gray-400">
                      € 3,00
                    </p>
                  </li> */}
                      <hr className="my-4 dark:border-gray-800" />

                      <li className="my-2 flex items-center justify-between">
                        <p className="text-3xl font-medium dark:text-white">
                          Total
                        </p>
                        {newAmount?.value ? (
                          <>
                            <p className="ml-1 text-xl font-bold dark:text-white">
                              {formatePrice({
                                currency: newAmount?.currency,
                                value: Number(newAmount?.value),
                                isDivide: false,
                              }) ?? ''}
                            </p>
                          </>
                        ) : (
                          'Free'
                        )}
                      </li>
                    </div>
                  </div>

                  <>
                    {isEdit &&
                    newAmount?.value &&
                    userAddress?.isUpdated &&
                    userAddress?.street1 &&
                    userAddress?.city &&
                    userAddress?.country ? (
                      <div className="mt-2 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
                        <div className="p-4 sm:p-4 lg:p-3">
                          <div className="font-extrabold">Payment method</div>
                          <div className="mt-4 space-y-4">
                            {paymentMethodArray.map((lk, index) => (
                              <div key={index}>
                                <label
                                  htmlFor={lk?.value}
                                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:border-gray-600 dark:bg-[#04080b] dark:hover:border-blue-600"
                                >
                                  <p className="text-gray-700 dark:text-gray-200">
                                    {lk?.name}
                                  </p>

                                  <p className="text-gray-700 dark:text-white">
                                    {lk?.image}
                                  </p>
                                  <input
                                    type="radio"
                                    {...register('paymentMethod')}
                                    value={lk?.value}
                                    id={lk?.value}
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {isEdit && Number(newAmount?.value) > 0 ? (
                      <>
                        {!isValid && !watchPaymentMethod ? (
                          <div className="my-4 items-center">
                            <ButtonInput
                              size="lg"
                              type="submit"
                              variant="primary"
                              className="w-full"
                              disabled={!isValid}
                            >
                              Continue
                            </ButtonInput>
                          </div>
                        ) : (
                          <>
                            {isValid && newAmount?.value ? (
                              <>
                                {watchPaymentMethod === 'STRIPE' ? (
                                  <CreateCardStripe
                                    paymentModel="STRIPE-SHOP"
                                    data={{
                                      affiliate,
                                      userAddress,
                                      productId,
                                      amount: newAmount,
                                      userBuyerId: userBayer?.id,
                                      organizationSellerId:
                                        item?.organizationId,
                                      organizationBuyerId:
                                        userBayer?.organizationId,
                                    }}
                                  />
                                ) : null}

                                {watchPaymentMethod === 'PAYPAL' ? (
                                  <CreatePaymentPayPal
                                    paymentModel="PAYPAL-SHOP"
                                    data={{
                                      affiliate,
                                      userAddress,
                                      productId,
                                      amount: newAmount,
                                      userBuyerId: userBayer?.id,
                                      organizationSellerId:
                                        item?.organizationId,
                                      organizationBuyerId:
                                        userBayer?.organizationId,
                                    }}
                                  />
                                ) : null}
                              </>
                            ) : (
                              <div className="my-4 flex items-center">
                                <ButtonInput
                                  type="submit"
                                  variant="primary"
                                  className="w-full"
                                >
                                  Continue
                                </ButtonInput>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* <CreatePaymentFree
                              paymentModel="FREE-EVENT"
                              data={{
                                userAddress,
                                productId: item?.id,
                                affiliation: newAffiliation,
                                amount: {
                                  quantity: 1,
                                  price: 0,
                                  currency: 'USD',
                                  value: 0,
                                  oneValue: Number(priceJsonParse?.amount),
                                },
                                organizationSellerId: item?.organizationId,
                                organizationBuyerId:
                                  userStorage?.organizationId,
                              }}
                            /> */}
                      </>
                    )}
                  </>
                </div>
              </>
            )}
          </div>
          <div className="items-center justify-center text-center">
            <p className="text-sm font-normal text-gray-500">
              All the taxes will be calculated while checkout
            </p>
          </div>
        </div>
      </LayoutCheckoutSite>
    </>
  );
};

export default PrivateComponent(CheckoutProduct);