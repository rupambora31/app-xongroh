import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/store/slices/profileApiSlice";

const AuthorHeader = ({ author }) => {
  // console.log(author);

  const { data, isLoading, isError, isSuccess, error } =
    useGetProfileQuery(author);

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return console.error(error);
  }

  if (isSuccess && data.documents.length > 0) {
    // Accessing the first document in the documents array
    const { username, dp } = data.documents[0];
    // console.log("Username:", username, "DP:", dp);
    return (
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div>
          <Button variant="normal" size="normal" className="flex">
            <div className="flex items-center">
              <div>
                {dp ? (
                  <img
                    className="h-9 w-9 rounded-full"
                    src={dp}
                    alt="profile"
                  />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
                      fill="#BDC3C8"
                    />
                  </svg>
                )}
              </div>
              <div className="pl-4">{username || ""}</div>
            </div>
          </Button>
        </div>
        {/* <div>
        <img src={Assets.more} alt="more" className="items w-8" />
      </div> */}
      </div>
    );
  }
  return null;
};

export default AuthorHeader;
