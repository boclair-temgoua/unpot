/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Skeleton } from "antd";
import ListCommentsPosts from "./list-comments-posts";
import { GetInfiniteCommentsAPI } from "@/api-site/comment";
import { CreateOrUpdateFormComment } from "./create-or-update-form-comment";
import { useAuth } from "../util/context-user";


const ListComments: React.FC<{ take: number, postId: string, userVisitorId: string }> = ({ take, postId, userVisitorId }) => {

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: take,
    sort: "DESC",
    postId: postId,
    userVisitorId,
  });

  const dataTableComments = isLoadingComments ? (
    <Skeleton className="py-4" loading={isLoadingComments} avatar paragraph={{ rows: 1 }} />
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsPosts item={item} key={index} index={index} userVisitorId={userVisitorId} />
      ))
  );

  return (
    <>
      <CreateOrUpdateFormComment postId={postId} />

      <ul className="mt-4 divide-y divide-gray-200 -my-9">

        {dataTableComments}

      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-4 flex flex-col justify-between items-center">
            {isFetchingNextPage ? null :
              <button
                disabled={isFetchingNextPage ? true : false}
                onClick={() => fetchNextPage()}
                className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
              >
                View more comments
              </button>}
          </div>
        </>
      ) : null}

    </>
  );
};

export default ListComments;
