import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

interface Tag {
    id: string
    name: string
    slug: string
    description?: string
    featureImage?: string
    totalPost: number
    createdAt: string
    updatedAt: string
  }  
  
  interface Data {
    page: number;
    pageSize: number;
    total: number;
    datas: Tag[];
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

const fetchTags = async (): Promise<Data> => {
  const response = await axiosInstance.get<ApiResponse<Data>>(
    "/api/v1/cms/tags"
  );
  console.log("API response:", response);

  if (!response.meta.success) {
    throw new Error(response.meta.externalMessage);
  }
  
  const processedData = {
    ...response.data.datas,
    datas: response.data.datas.map((tag, index) => ({
      ...tag,
      key: index,
    })),
  };

  return processedData
};

const useTags = () => {
  // const queryClient = useQueryClient()

  const {
    data: tagData,
    isLoading,
    error,
    refetch,
  } = useQuery<Data, Error>({
    queryKey: ["fetchTags"],
    queryFn: fetchTags,
  });

  return {
    tagData,
    isLoading,
    error,
    refetch,
  };
};

export default useTags;
