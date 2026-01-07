import { useDispatch } from "react-redux";
import { fetchUsers } from "@/services/user-service";
import { useEffect, useState } from "react";
import UserTable from "@/components/shared/user-table";
import { setLoadingUsers, setUsers } from "@/store/slices/users-slice";

export default function HomePage() {
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      dispatch(setLoadingUsers(true));
      const users = await fetchUsers();
      dispatch(setUsers(users));
    } catch (error) {
      console.error("Error in getAllUsers:", error);
    } finally {
      dispatch(setLoadingUsers(false));
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="h-full w-full min-h-0 px-4 py-7 pb-3">
      <div className="mx-auto w-full h-full p-2 min-h-0">
        <UserTable />
      </div>
    </div>
  );
}
