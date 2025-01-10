import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

interface Post {
  id: string;
  uuid: string;
  slug: string;
  title: string;
  excerpt?: string;
  featureImage?: string;
  authors: Author[];
  tags: Tag[];
  sectors: Sector[];
  assets: Asset[];
  postType: PostType;
  postFormat: string;
  status: string;
  visibility: string;
  totalView: number;
  totalShare: number;
  totalWord: number;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Data {
  page: number;
  pageSize: number;
  total: number;
  datas: Post[];
}

interface ApiResponse<Data> {
  meta: {
    status: number;
    success: boolean;
    externalMessage: string;
    internalMessage: string;
  };
  data: Data;
}

const fetchPosts = async (): Promise<Data> => {
  const response = await axiosInstance.get<ApiResponse<Data>>(
    "/api/v1/cms/posts"
  );
  console.log("API response:", response);

  if (!response.meta.success) {
    throw new Error(response.meta.externalMessage);
  }

  const processedData = {
    ...response.data.datas,
    datas: response.data.datas.map((post, index) => ({
      ...post,
      key: index,
    })),
  };

  return processedData
};

const usePosts = () => {
  // const queryClient = useQueryClient()

  const {
    data: postData,
    isLoading,
    error,
    refetch,
  } = useQuery<Data, Error>({
    queryKey: ["fetchPosts"],
    queryFn: fetchPosts,
  });

  return {
    postData,
    isLoading,
    error,
    refetch,
  };
};

export default usePosts;
