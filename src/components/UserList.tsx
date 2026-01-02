import userService, { User } from '../services/user-service';
import useUsers from '../hooks/useUsers';

const UserList = () => {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (userToDelete: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== userToDelete.id));

    userService.delete(userToDelete.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser: User = {
      id: 0,
      name: 'James',
    };
    setUsers([...users, newUser]);

    userService
      .create(newUser)
      .then((response) => {
        setUsers([...originalUsers, response.data]);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (userToUpdate: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...userToUpdate, name: userToUpdate.name + '!' };
    setUsers(
      users.map((user) => (user.id === userToUpdate.id ? updatedUser : user))
    );

    userService.update(userToUpdate).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
