import PostContent from "@/components/post/creation/creation-postpage/PostContent";
import PostHeader from "@/components/post/creation/creation-postpage/PostHeader";
import { useGetPostQuery } from "@/store/slices/postApiSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CreationPostPage = () => {
  const { id } = useParams();

  const {
    data: postData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetPostQuery(id);

  console.log(postData);

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (isError) {
    return console.error(error);
  }

  return (
    isSuccess && (
      <>
        <PostHeader author={postData.author} />
        <PostContent postContent={postData} />
      </>
    )
  );
};

export default CreationPostPage;
