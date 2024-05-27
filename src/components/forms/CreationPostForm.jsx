import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  useCreatePostMutation,
  useCreatePostFileMutation,
} from "@/store/slices/postApiSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  content: z.string().min(2, { message: "Please write something!" }),
  // tags: z
  //   .string()
  //   .transform((value) => value.split(",").map((tag) => tag.trim())), // Transform string into array
});
// .refine((data) => Array.isArray(data.tags), {
//   path: ["tags"],
//   message: "Tags must be a valid array",
// });

const PostForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const [
    createPost,
    {
      isLoading: createPostLoading,
      isSuccess: createPostSuccess,
      isError: createPostError,
      error: createPostErrorMsg,
    },
  ] = useCreatePostMutation();
  const [
    createPostFile,
    {
      isLoading: fileUploadLoading,
      isSuccess: fileUploadSuccess,
      isError: fileUploadError,
      error: fileUploadErrorMsg,
    },
  ] = useCreatePostFileMutation();

  const [isDraft, setIsDraft] = useState(false);
  const [fileId, setFileId] = useState("");
  const userId =
    JSON.parse(localStorage.getItem("userData"))?.$id ?? "undefined";

  const [createdPostId, setCreatedPostId] = useState(null);

  const onSubmit = async (formData) => {
    const postData = {
      content: formData.content,
      // tags: formData.tags,
      author: userId,
      isDraft: isDraft,
      contentFileId: fileId,
    };

    const postResult = await createPost(postData).unwrap();

    setCreatedPostId(postResult.$id);
    // Reset isDraft state after submission
    setIsDraft(false);
  };

  useEffect(() => {
    if (createPostSuccess && createdPostId !== null) {
      navigate(`/creation/${createdPostId}`);
    }
  }, [createPostSuccess, createdPostId]);

  const handleDraftClick = () => {
    setIsDraft(true);
  };

  const handlePublishClick = () => {
    setIsDraft(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileResult = await createPostFile(file).unwrap();
      console.log("Result:: ", fileResult);

      setFileId(fileResult.$id);
      console.log("Result:: ", fileResult.$id);
    } catch (error) {
      console.error("Failed to upload file: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12  ">
      <Card className="p-6 xl:w-1/2 md:w-2/3 shadow-md bg-card">
        <div className="w-full flex flex-col gap-y-3 items-start justify-center mb-8">
          <h1 className="text-2xl font-bold pb-3">Add Creation</h1>
          {/* <p className="text-muted-foreground text-sm">
            This marks a new beginning...
          </p> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Upload:
              <Input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
          </div>
          <div>
            {fileUploadLoading && <p className="text-sm">Uploading...</p>}
            {fileUploadError && (
              <p className="text-red-600 text-sm">Error uploading file.</p>
            )}
            {fileUploadSuccess && (
              <p className="text-green-500 text-sm">File Uploaded!</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Content:
              <Textarea
                autoComplete="off"
                placeholder="Write something..."
                {...register("content")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium">
              Tags:
              <Input
                autoComplete="off"
                placeholder="Write tags separted by a comma. [Tag1, Tag2, Tag3]"
                {...register("tags")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.tags && (
              <p className="mt-2 text-sm text-red-600">{errors.tags.message}</p>
            )}
          </div> */}

          <div className="pt-5 flex gap-5">
            <div className="w-1/2">
              <Button
                className="w-full"
                onClick={handleDraftClick}
                disabled={
                  fileUploadLoading ||
                  fileUploadError ||
                  createPostLoading ||
                  createPostError
                }
                variant="outline"
              >
                {createPostLoading && isDraft ? "Saving..." : "Save as Draft"}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                className="w-full"
                onClick={handlePublishClick}
                disabled={
                  fileUploadLoading ||
                  fileUploadError ||
                  createPostLoading ||
                  createPostError
                }
              >
                {createPostLoading && !isDraft ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PostForm;
