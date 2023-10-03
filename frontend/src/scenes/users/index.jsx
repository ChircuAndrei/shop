import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {useEffect, useState} from "react";

const fetchUsers = async () => {
    try {
        const response = await fetch(`http://localhost:8080/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};


const Users = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            role === "admin"
                                ? colors.greenAccent[600]
                                : role === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {role === "manager" && <SecurityOutlinedIcon />}
                        {role === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await fetchUsers();
            parseRoles(usersData)
            setUsers(usersData)
        };

        fetchData();
    }, []);

    const parseRoles = (userList) => {
        userList.forEach(user => {
            if (user.role === null || user.role === "USER") user.role = "user";
            if (user.role === "MANAGER") user.role = "manager";
            if (user.role === "ADMIN") user.role = "admin";
        })
    }

    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Managing the Users" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={users} columns={columns} />
            </Box>
        </Box>
    );
};

export default Users;