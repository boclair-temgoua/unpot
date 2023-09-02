import LayoutDashboard from "@/components/layout-dashboard";
import { GetOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { Avatar, Image, Spin } from "antd";
import ListComments from "@/components/comment/list-comments";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoShareOutline } from "react-icons/io5";
import { HtmlParser } from "@/utils/html-parser";
import { formateDMYHH } from "@/utils";
import ReactPlayer from "react-player";
import { useAuth } from "@/components/util/session/context-user";
import { FiDownload } from "react-icons/fi";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { LoadingOutlined } from "@ant-design/icons";

const PostShow = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const {
    data: postItem,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug, likeUserId: user?.id });
  const post: PostModel | undefined = postItem?.data;

  const dataTablePosts = isLoadingPost ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorPost ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <ListFollowPosts item={post} commentTake={10} />
  );

  return (
    <>
      <LayoutDashboard title={"Home"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-7xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-8xl">
                <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                  <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div className="mx-auto sm:px-6 md:px-8">
                        {dataTablePosts}
                      </div>
                    </div>
                  </div>

                  <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">
                    <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-400/60">
                      <div className="overflow-hidden rounded ">
                        <div className="px-4 py-6 sm:p-6 lg:p-8">
                          <h3 className="font-bold text-gray-700">
                            {" "}
                            Latest Posts{" "}
                          </h3>

                          <div className="flow-root mt-8">
                            <ul className="divide-y divide-gray-200 -my-7">
                              <li className="flex items-stretch justify-between space-x-2 py-7">
                                <div className="flex-shrink-0">
                                  <Image
                                    height={65}
                                    preview={false}
                                    className="object-cover w-16 h-16 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-1.png"
                                    alt=""
                                  />
                                </div>

                                <div className="flex flex-col justify-between flex-1 ml-5">
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">
                                    Voici donc les 3 prochains sujets prévus sur Patreon
                                    </p>
                                    <div className="flex mt-4 items-center text-gray-500">
                                      <CreateOrUpdateFormLike
                                        typeLike="POST"
                                        item={[]}
                                      />

                                      <button className="ml-3.5 text-lg font-bold text-gray-500">
                                        <BiComment />
                                      </button>
                                      <span className="ml-1.5 font-normal text-sm">
                                        20
                                      </span>
                                      <span className="ml-7 font-normal text-sm">
                                        01 sept. 2023
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="flex items-stretch justify-between space-x-2 py-7">
                                <div className="flex-shrink-0">
                                  <Image
                                    height={65}
                                    preview={false}
                                    className="object-cover w-16 h-16 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
                                    alt=""
                                  />
                                </div>

                                <div className="flex flex-col justify-between flex-1 ml-5">
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">
                                      Voici donc les 3 prochains sujets prévus
                                      sur Patreon
                                    </p>
                                    <div className="flex mt-4 items-center text-gray-500">
                                      <CreateOrUpdateFormLike
                                        typeLike="POST"
                                        item={[]}
                                      />

                                      <button className="ml-3.5 text-lg font-bold text-gray-500">
                                        <BiComment />
                                      </button>
                                      <span className="ml-1.5 font-normal text-sm">
                                        19
                                      </span>
                                      <span className="ml-7 font-normal text-sm">
                                        16 jui. 2023
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="flex items-stretch justify-between space-x-2 py-7">
                                <div className="flex-shrink-0">
                                  <Image
                                    height={65}
                                    preview={false}
                                    className="object-cover w-16 h-16 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
                                    alt=""
                                  />
                                </div>

                                <div className="flex flex-col justify-between flex-1 ml-5">
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">
                                      Voici donc les 3 prochains sujets prévus
                                      sur Patreon
                                    </p>

                                    {/* <p className="mt-1 text-sm font-medium text-gray-500">
                              01 sept. 2023
                            </p> */}
                                    <div className="flex mt-2 items-center text-gray-500">
                                      <CreateOrUpdateFormLike
                                        typeLike="POST"
                                        item={[]}
                                      />

                                      <button className="ml-3.5 text-lg font-bold text-gray-500">
                                        <BiComment />
                                      </button>
                                      <span className="ml-1.5 font-normal text-sm">
                                        599
                                      </span>
                                      <span className="ml-7 font-normal text-sm">
                                        04 jui. 2023
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PostShow;
