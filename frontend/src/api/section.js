import { queryOptions } from "@tanstack/react-query";
import config from "../common/config";

/// 获取分区列表
export const getSectionsOptions = () => {
  return queryOptions({
    queryKey: ["getSections"],
    queryFn: async () => {
      return [];
    },
    staleTime: 5 * 1000,
    retry: false,
  });
};
