import * as React from "react";
import isEmpty from "lodash.isempty";
import { noUsers, title, userList, user } from "./UsersList.module.css";

const UsersList = ({ error, users, retrieved }) =>
  !retrieved ? (
    <p>Loading...</p>
  ) : !isEmpty(users) ? (
    <div className={userList}>
      <h1 className={title}>Statically Optimized User List</h1>
      {users.map(({ name }) => (
        <div className={user} key={name}>
          {name}
        </div>
      ))}
    </div>
  ) : (
    <div className={noUsers}>{error || "Failed to load users list"}</div>
  );

export default UsersList;