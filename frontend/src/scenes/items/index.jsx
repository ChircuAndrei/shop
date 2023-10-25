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
import CustomTextField from "../../components/CustomTextField";

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
    const [visibilityState, setVisibilityState] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const theme = useTheme();
    const navigate = useNavigate();
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
                    <Button
                        onClick={() => handleVisibilityToogleClick(item.id)}
                        variant="contained"
                        startIcon={
                            visibilityState[item.id] ? <CheckBoxRoundedIcon /> : <IndeterminateCheckBoxRoundedIcon />
                        }
                        style={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            border: 'none',
                        }}
                    />
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
                                <CustomTextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.name}
                                    onChange={(event) => handleFieldChange(event, 'name')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label="Price"
                                    type="text"
                                    variant="standard"
                                    value={editedItem.price}
                                    onChange={(event) => handleFieldChange(event, 'price')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="category"
                                    label="Category"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.category}
                                    onChange={(event) => handleFieldChange(event, 'category')}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editedItem.description}
                                    onChange={(event) => handleFieldChange(event, 'description')}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => handleEdit(selectedItem)}>Edit</Button>
                                </DialogActions>
                            </Dialog>
                        <Button onClick={() => handleDeleteSubmit(item.id)} variant="contained" startIcon={<DeleteIcon />} />
                    </ButtonGroup>
                );
            },
        },
    ];

    const handleVisibilityToogleClick = async (itemId) => {
        try {
            const response = await fetch('http://localhost:8080/items/toggle-visibility/' + itemId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemId),
            });
    
            if (response.ok) {
                console.log('Item updated successfully.');
                setVisibilityState(prevState => ({
                    ...prevState,
                    [itemId]: !prevState[itemId],
                }));
            } else {
                console.error('Error submitting updateItemById.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleClickOpen = (item) => {
        setSelectedItem(item)
        setEditedItem({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
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
    

    const handleEdit = async (item) => {

        item.name = editedItem.name;
        item.price = editedItem.price;
        item.category = editedItem.category;
        item.description = editedItem.description;
        try {
            const response = await fetch('http://localhost:8080/items/' + item.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
    
            if (response.ok) {
                console.log('Item updated successfully.');
            } else {
                console.error('Error submitting deleteUser.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
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

    const addItem = () => {
        navigate("/admin/add-item")
    }


    useEffect(() => {
        const fetchData = async () => {
            const itemsData = await fetchItems();
            setItems(itemsData)

            const initialVisibilityState = {};
            itemsData.forEach((item) => {
                initialVisibilityState[item.id] = item.visibility;
            });
            setVisibilityState(initialVisibilityState);
        };
        

        fetchData();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ITEMS" subtitle="Here you can see and manage all your items" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => addItem()}
                    >
                        Add Item
                    </Button>
                </Box>
            </Box>
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