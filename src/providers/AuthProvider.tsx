import { useEffect, useMemo, useState } from 'react';

import { useUser } from '../hooks/useAuth';
import { AuthProviderPropsType, UserType } from '../types/authService.types';
import { AuthContext } from '../contexts/AuthContext';

export function AuthProvider({ children }: AuthProviderPropsType) {
  const { data: userData, isPending, refetch } = useUser();

  const [user, setUser] = useState<UserType | null>(userData || null);

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  const values = useMemo(
    () => ({ user, setUser, isPending, refetch }),
    [user, setUser, isPending, refetch]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
