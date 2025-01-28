import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "../components/providers/socket-provider";
import API from "../features/MainApi";


export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }) => {
    const {isConnected} = useSocket();
    console.log(queryKey, apiUrl, paramKey, paramValue, 'rrrrrrrr')
    const fetchMessages = async ({ pageParam = undefined }) => {
        try {
          const url = qs.stringifyUrl({
            url: `${apiUrl}/all-messages`,
            
            query: {
              cursor: pageParam,
              [paramKey]: paramValue,
            }
  
          }, { skipNull: true });
      
          const data = await API.get(url);
          
          // const data =  res;
          console.log(data, 'rrrrrrrrrrrrrrr')
          return data?.data;
        } catch(error) {
          console.log(error)
        }
      };
    
    
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
      });    
      
    return {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} ;

}