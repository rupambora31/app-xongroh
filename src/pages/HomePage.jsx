import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "@/store/slices/postApiSlice";
import CreationPostList from "@/components/post/creation/CreationPostList";

const HomePage = () => {
  // const {
  //   data: creationPosts,
  //   isSuccess,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetPostsQuery();
  // console.log(creationPosts);

  return (
    <>
      <div className="flex flex-col m-4 gap-5">
        <div>Home Page</div>
        <div>
          <Link to="/profile">
            <Button>Profile</Button>
          </Link>
        </div>
        <div>
          <Link to="/portfolio">
            <Button>Portfolio</Button>
          </Link>
        </div>
        <div>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <div>
          <Link to="/add-creation">
            <Button>Add Creation</Button>
          </Link>
        </div>

        <div><CreationPostList/></div>
      </div>
    </>
  );
};

export default HomePage;
