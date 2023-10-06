import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/context-user";
import { CreateOrUpdateFormCommission } from "@/components/commission/create-or-update-form-commission";
import { GetOneCommissionAPI } from "@/api-site/commission";
import { GetUploadsAPI } from "@/api-site/upload";
import { LoadingFile } from "@/components/ui/loading-file";

const ShopEdit = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const commissionId = String(query?.commissionId);

  const {
    data: commission,
    isError: isErrorCommission,
    isLoading: isLoadingCommission,
  } = GetOneCommissionAPI({
    commissionId,
    userId: userStorage?.id,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "commission",
    userId: userStorage?.id,
    uploadableId: commissionId,
  });

  const dataTableCommission =
    isLoadingImageUploads || isErrorCommission ? (
      <LoadingFile />
    ) : isErrorImageUploads ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <CreateOrUpdateFormCommission
        commission={commission}
        uploadImages={dataImageUploads}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${commission?.title || "Commission"}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTableCommission}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);
