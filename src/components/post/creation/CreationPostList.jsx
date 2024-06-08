import React from "react";
import { useGetPostsQuery } from "@/store/slices/postApiSlice";
import CreationPostCard from "./CreationPostCard";

const CreationPostList = () => {
 const { data, isSuccess, isLoading, isError, error } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }

  console.log(data);
  if (isSuccess && data) {
    return (
      <div>
        {data.documents.map((post) => (
          <CreationPostCard key={post.$id} post={post} />
        ))}
      </div>
    );
  }

  // Fallback UI
  return <div>No posts found.</div>;
};

export default CreationPostList;
