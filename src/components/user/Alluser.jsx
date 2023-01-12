import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import useAuthHooks from "../../utils/hooks/useAuth";
import EditUserActions from "./EditUserActions";

export default function Alluser() {
  const { getToken } = useAuthHooks();

  // get all user
  const userUrl = "http://localhost:5000/api/user";
  const token = getToken();

  //states
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [fetchUser, setFetchUser] = useState(false);

  //table colume
  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Avatar",
        headerAlign: "center",
        align: "center",
        width: 80,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <Avatar
            src={`${process.env.REACT_APP_URL}/images/uploads/user/${params.row.image}`}
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Name",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        width: 150,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        width: 170,
        editable: true,
      },
      {
        field: "userRole",
        headerName: "Role",
        width: 100,
        headerAlign: "center",
        align: "center",
        headerClassName: "super-app-theme--header",
        type: "singleSelect",
        valueOptions: ["user", "admin"],
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 150,
        headerAlign: "center",
        align: "center",
        headerClassName: "super-app-theme--header",
        renderCell: (params) =>
          format(new Date(params.row.createdAt), "dd/MM/yyyy"),
      },
      {
        field: "active",
        headerName: "Active",
        headerClassName: "super-app-theme--header",
        width: 70,
        headerAlign: "center",
        align: "center",
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        headerClassName: "super-app-theme--header",
        width: 150,
        headerAlign: "center",
        align: "center",
        type: "actions",
        renderCell: (params) => (
          <EditUserActions {...{ params, rowId, setRowId, setFetchUser }} />
        ),
      },
    ],
    [rowId]
  );

  //get all users
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    };

    fetchData();
  }, [token, fetchUser]);

  return (
    <>
      <Typography
        sx={{
          margin: "5px 0px 20px 0px",
          fontSize: "20px",
          fontWeight: "500",
        }}
        variant="h2"
        color="primary"
      >
        All User
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <DataGrid
          autoHeight
          rows={users}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onCellEditCommit={ params => setRowId(params.id)}
        />
      </Box>
    </>
  );
}
