import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting/ant/button-input';
import { GetOneUserPrivateAPI } from '@/api-site/user';
import { cn } from '@/lib/utils';
import { TextInput } from '../ui-setting/shadcn';

type Props = {
  userId: string;
};

const schema = yup.object({
  username: yup.string().required(),
});

const UpdateFormUser: React.FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { data: user } = GetOneUserPrivateAPI({ userId });

  useEffect(() => {
    if (user) {
      const fields = ['username'];
      fields?.forEach((field: any) => setValue(field, user[field]));
    }
  }, [user, userId, setValue]);

  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log('payload =======>', payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cn(
            'mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]',
          )}
        >
          <div className={cn('px-4 py-5')}>
            <h2 className={cn('text-base font-bold')}> Personal Info </h2>

            <div
              className={cn(
                'mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1',
              )}
            >
              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="username"
                  errors={errors}
                />

                {/* <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <input
                      disabled
                      defaultValue="http://localhost:3000"
                      className="h-full py-0 pl-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-none rounded-l-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                    />
                  </div>

                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone number"
                    value=""
                    className="block border w-full py-3 pl-20 pr-4 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div> */}
              </div>
            </div>

            <div className={cn('mb-2 mt-4 flex items-center space-x-4')}>
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormUser };
