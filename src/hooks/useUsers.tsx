import { useInfiniteQuery } from '@tanstack/react-query'
import type { User } from '../types';
import { fetchUsers } from './useFetchUsers'


export const useUsers = () => {
  const { isLoading: loading,
    isError: error,
    data,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery<{ nextCursor: number, users: User[] }>({
    queryKey: ['users'], // <-- key de la info
    queryFn: ({ pageParam }) => fetchUsers(pageParam), //<-- como trae la info
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  return{
    loading, 
    error, 
    allUsers : data?.pages.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

