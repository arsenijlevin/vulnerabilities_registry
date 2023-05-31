interface IQueryOptions {
  refetchOnMount: boolean;
  refetchOnWindowFocus: boolean;
}


export const useQueryOptions: IQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false
};
