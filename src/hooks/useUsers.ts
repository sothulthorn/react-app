import { useState, useEffect } from 'react';
import { CanceledError } from '../services/api-client';
import userService, { User } from '../services/user-service';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.getAll<User>();
    request
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => {
      cancel();
    };
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
