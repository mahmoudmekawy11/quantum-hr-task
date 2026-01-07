import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { CustomToolbar } from "./custom-table-toolbar";
import { useAppSelector } from "@/hooks/redux-hooks";
import { usersSelector } from "@/store/selectors";
import type { User } from "@/types";
import { UserCog } from "lucide-react";
import { useState } from "react";
import ModalApp from "./modal-app";
import UserDetailsInfo from "../ui/user-details-info";

const UserTable = () => {
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCloseEditUserDialog = () => {
    setOpenEditUserDialog(false);
  };

  const handleOpenEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setOpenEditUserDialog(true);
  };

  const columns: GridColDef<User>[] = [
    {
      field: "image",
      headerName: "Avatar",
      width: 90,
      sortable: false,
      filterable: false, // Disable filtering for image column
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.fullName}
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 0.7,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      getApplyQuickFilterFn: () => null,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
      getApplyQuickFilterFn: () => null,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
      getApplyQuickFilterFn: () => null,
    },
    {
      field: "userinfo",
      headerName: "User Info",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <UserCog
          className="h-5 w-5 cursor-pointer"
          onClick={() => handleOpenEditUserDialog(params.row)}
          color="#063577"
        />
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  const { users, loadingUsers } = useAppSelector(usersSelector);

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <div className="flex-1 min-h-0">
        <DataGrid<User>
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: [], // Initialize quick filter
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          disableColumnMenu
          disableDensitySelector
          loading={loadingUsers}
          sx={{
            height: "100%",
            minHeight: 0,
            border: 1,
            borderRadius: 2,
            borderColor: "grey.400",
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500, // Add debounce for better performance
              },
            },
          }}
          getRowId={(row) => row.id}
          showToolbar
        />
      </div>

      {/* Edit User Dialog */}
      <ModalApp open={openEditUserDialog} onClose={handleCloseEditUserDialog}>
        <UserDetailsInfo userData={selectedUser!} />
      </ModalApp>
    </div>
  );
};

export default UserTable;
