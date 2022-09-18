import { Avatar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useAuthHooks from "../../utils/hooks/useAuth";

export default function Alluser() {
  const { getToken } = useAuthHooks();

  // get all user
  const userUrl = "http://localhost:5000/api/user";
  const token = getToken();

  //states
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  //table colume
  const columns = [
    {
      field: "image",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={`${process.env.REACT_APP_URL}/images/uploads/user/${params.row.image}`}
        />
      ),
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "userRole",
      headerName: "Role",
      width: 100,
      type: "singleSelect",
      valueOptions: ["user", "admin"],
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      renderCell: (params) =>
        format(new Date(params.row.createdAt), "dd/MM/yyyy"),
    },
    {
      field: "active",
      headerName: "Active",
      width: 70,
      type: "boolean",
    },
  ];

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
  }, [token]);

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
      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={users}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>
    </>
  );
}
