import {Box, Button, ButtonGroup } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import TextField from '@mui/material/TextField';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { boolean } from "yup";

const fetchItems = async () => {
    try {
        const response = await fetch(`http://localhost:8080/items`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

const Items = () => {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "category",
            headerName: "Category",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "visibility",
            headerName: "Visibility",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                const item = params.row;

                return (
                    item.visibility ? <CheckBoxRoundedIcon /> : <IndeterminateCheckBoxRoundedIcon />
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                const item = params.row;

                return (
                    <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={() => handleClickOpen(item)} variant="contained" startIcon={<EditIcon />} />
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Edit</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    Please input new details!
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="username"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.username}
                                    onChange={(event) => handleFieldChange(event, 'username')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="address"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.address}
                                    onChange={(event) => handleFieldChange(event, 'address')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phoneNumber"
                                    label="Phone number"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.phoneNumber}
                                    onChange={(event) => handleFieldChange(event, 'phoneNumber')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.email}
                                    onChange={(event) => handleFieldChange(event, 'email')}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => handleEdit(item)}>Edit</Button>
                                </DialogActions>
                            </Dialog>
                        <Button onClick={() => handleDeleteSubmit(item.id)} variant="contained" startIcon={<DeleteIcon />} />
                    </ButtonGroup>
                );
            },
        },
    ];

    const handleClickOpen = (item) => {
        setSelectedItem(item)
        setEditedItem({
            username: item.username,
            address: item.address,
            phoneNumber: item.phoneNumber,
            email: item.email,
        });
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleFieldChange = (event, fieldName) => {
        const { value } = event.target;

        setEditedItem((prevEditedItem) => ({
            ...prevEditedItem,
            [fieldName]: value,
        }));
    };
    

    const handleEdit = async (user) => {

        user.username = editedItem.username;
        user.address = editedItem.address;
        user.phoneNumber = editedItem.phoneNumber;
        user.email = editedItem.email;
        try {
            user.role = user.role.toUpperCase();
            const response = await fetch('http://localhost:8080/users/' + user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                console.log('Item updated successfully.');
            } else {
                console.error('Error submitting deleteUser.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        user.role = user.role.toLowerCase();
        setOpen(false);
    };

    const handleDeleteSubmit = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });
    
            if (response.ok) {
                console.log('Item removed successfully.');
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                console.error('Error submitting deleteItem.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const itemsData = await fetchItems();
            setItems(itemsData)
        };

        fetchData();
    }, []);

    return (
        <Box m="20px">
            <Header
                title="PRODUCTS"
                subtitle="Here you can see and edit all your products"
            />
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={items}
                    columns={columns}
                    slots={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Items;