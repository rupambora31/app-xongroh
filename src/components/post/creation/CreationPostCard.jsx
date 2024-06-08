import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetPostFileViewQuery } from "@/store/slices/postApiSlice";
import { Link } from "react-router-dom";
import AuthorHeader from "./creation-postpage/AuthorHeader";

const CreationPostCard = ({ post }) => {
  const { data, isLoading, isError, isSuccess } = useGetPostFileViewQuery(
    post.contentFileId
  );

  function getTimeDifference(createdAt) {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdAtDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} secs`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hrs`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 365) {
      return `${diffInDays} days`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} yrs`;
  }

  return (
    isSuccess && (
      <>
        <Card className="mt-5 break-inside-avoid sm:m-0 sm:mb-4 lg:mb-6">
          <div>
            <div className="flex items-center justify-between">
              <AuthorHeader author={post.author} />
              <div className="pr-6 text-muted-foreground text-xs">
                {getTimeDifference(post.$createdAt)}
              </div>
            </div>
          </div>
          <Link to={`/creation/${post.$id}`}>
            <CardContent className="px-6 pb-2">
              <div>
                {post.contentFileId && (
                  <div className="pt-4">
                    <img
                      src={data.href}
                      alt={`Image for ${post.title}`}
                      className="w-full md:w-1/2 lg:w-2/3 xl:w-2/4 2xl:w-2/5 object-contain"
                    />
                  </div>
                )}
              </div>
              <div
                className="text-foreground pt-2  text-sm	leading-normal line-clamp-4 "
                // onClick={handlePostClick}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  wordWrap: "break-word",
                }}
              >
                {post.content}
              </div>
            </CardContent>
          </Link>
          <CardFooter className="p-4">
            <div className="flex items-center">
              <div>
                <Button variant="normal" size="normal">
                  {/* {interactions} */} 500
                </Button>
              </div>
              <div className="pl-3">
                <Button
                  variant="normal"
                  size="normal"
                  className="text-secondary-foreground
                "
                >
                  Share
                </Button>
              </div>
              <div className="pl-3">
                <Button
                  variant="normal"
                  size="normal"
                  className="text-secondary-foreground
                "
                >
                  Save
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </>
    )
  );
};

export default CreationPostCard;
