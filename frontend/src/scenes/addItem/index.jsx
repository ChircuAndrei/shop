import * as React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                console.log('Form data submitted successfully.');
                navigate("/admin/items")
            } else {
                console.error('Error submitting addItem data.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <Box m="20px">
            <Header title="CREATE ITEM" subtitle="Create a New Item" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.category}
                                name="category"
                                error={!!touched.category && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" startIcon={<UploadIcon />}>
                                Upload Image
                            </Button>
                        </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Item
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const priceRegExp = /^\d+(\.\d{1,2})?$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup
        .string()
        .matches(priceRegExp, "Price is not valid")
        .required("required"),
});
const initialValues = {
    name: "",
    category: "",
    description: "",
    price: "",
};

export default AddItem;