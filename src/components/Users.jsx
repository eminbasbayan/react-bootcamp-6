import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const data = await res.json();

        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchUsers();
  }, []);

  return (
    <div className="users">
      <h1 className="text-2xl font-bold">Users</h1>
      {users.map((item) => {
        return <div key={item.id}>name: {item.name.firstname}</div>;
      })}
    </div>
  );
};

export default Users;
