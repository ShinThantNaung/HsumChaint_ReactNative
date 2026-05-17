import { useQuery } from "@tanstack/react-query";
import { currentUserQueryKey, getCurrentUser } from "@/services/users";
import { useAuthUser } from "@/stores/auth-user";

export const useCurrentUser = () => {
  const accessToken = useAuthUser((state) => state.accessToken);

  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 5,
  });
};
