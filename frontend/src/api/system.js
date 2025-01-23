import { queryOptions } from "@tanstack/react-query";
import config from "../common/config";

export const getSystemInfoOptions = () => {
  return queryOptions({
    queryKey: ["getSystemInfo"],
    queryFn: async () => {
      console.log("fetch system info");
      const response = await fetch(config.server.url + "/api/system/info");
      if (!response.ok) {
        throw new Error("Cannot fetch system info");
      }
      return response.json();
    },
    staleTime: 60 * 1000,
    retry: false,
  });
};
