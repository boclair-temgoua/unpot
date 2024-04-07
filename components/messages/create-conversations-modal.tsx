import { createOneConversationAPI } from '@/api-site/conversations';
import { ConversationFormModel } from '@/types/message';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, TextareaReactQuillInput } from '../ui-setting';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateConversationsModal(props: {
  isOpen: boolean;
  setIsOpen: any;
  user: any;
}) {
  const { isOpen, setIsOpen, user } = props;
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<ConversationFormModel> = async (
    payload: ConversationFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await createOneConversationAPI({
        ...payload,
        organizationToId: user?.organizationId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Message send successfully',
      });
      reset();
      setIsOpen(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };
  return (
    <>
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <X />
              </span>
            </button>

            <div className="mx-auto flex">
              <h6 className="mt-3 text-xl font-bold">{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</h6>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="size-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{hasErrors}</AlertDescription>
                </Alert>
              )}

              <div className="relative flex w-full max-w-auto">
                <TextareaReactQuillInput
                  control={control}
                  name="description"
                  placeholder="Write your message"
                  errors={errors}
                  className="h-auto"
                />
                <ButtonInput
                  type="submit"
                  variant="info"
                  size="default"
                  className="!absolute right-1 top-1 rounded"
                  loading={loading}
                >
                  Send
                </ButtonInput>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}