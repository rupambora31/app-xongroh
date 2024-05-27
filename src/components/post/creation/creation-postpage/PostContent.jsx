import React from "react";
import { useGetPostFileViewQuery } from "@/store/slices/postApiSlice";

const PostContent = ({ postContent }) => {
  const { data, isLoading, isError, isSuccess } = useGetPostFileViewQuery(
    postContent.contentFileId
  );

  if (isError) {
    return <div>Error loading post content.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <>
        <div className="px-6 lg:px-8 pt-4 lg:pt-6">
          {postContent.contentFileId && (
            <div className="pt-4">
              <img
                src={data.href}
                alt={`Image for ${postContent.title}`}
                className="w-full md:w-1/2 lg:w-2/3 xl:w-2/4 2xl:w-2/5 object-contain"
              />
            </div>
          )}
          <div
            className="pb-8 pt-4 text-md leading-normal text-primary lg:text-base"
            style={{
              cursor: "pointer",
              overflow: "hidden",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {postContent.content}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default PostContent;
