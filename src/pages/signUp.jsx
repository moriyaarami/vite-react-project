import Input from "../commponets/common/input";

import { Navigate, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import Joi, { boolean, number } from "joi";
import userService, { createUser } from "../service/userService";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

function SignUp() {

    const navigate = useNavigate();
    const { createuser, user } = useAuth()

    const [biz, setbiz] = useState(false);
    const [serverError, setServerError] = useState('');


    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: ""
            },
            phone: "",
            email: "",
            password: "",
            image: {
                url: "",
                alt: ""
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            isBusiness: false,
        },
        validate(values) {
            const schema = Joi.object({
                name: Joi.object({
                    first: Joi.string().min(2).max(256).required().label("first name"),
                    middle: Joi.string().min(2).max(256).label("middle name").allow(""),
                    last: Joi.string().min(2).max(256).required().label("last name")
                }),
                phone: Joi.string().min(9).max(11).pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).required().label("phone number"),
                email: Joi.string().min(5).email({ tlds: { allow: false } }).pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required().label("email"),
                password: Joi.string().min(7).max(20).pattern(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/).required().label("password"),
                image: Joi.object({
                    url: Joi.string().min(14).allow(""),
                    alt: Joi.string().min(2).max(256).allow(""),
                }),
                address: Joi.object({
                    state: Joi.string().min(2).max(256).allow(""),
                    country: Joi.string().min(2).max(256).required().label("country"),
                    city: Joi.string().min(2).max(256).required().label("city"),
                    street: Joi.string().min(2).max(256).required().label("street"),
                    houseNumber: Joi.number().integer().required().label("house number"),
                    zip: Joi.number().required().label("zip"),
                }),
                isBusiness: Joi.required()
            })

            const { error } = schema.validate(values, { abortEarly: false });
            if (!error) {
                return null;
            }

            const errors = {};
            for (const detail of error.details) {
                const key = detail.context.key;
                errors[key] = detail.message;
            }

            return errors;
        },
        async onSubmit(values) {
            try {
                await createuser({ ...values, isBusiness: biz });
                alert("Your account has been successfully created")
                navigate("/sign-in");
            } catch (err) {
                if (err.response?.status === 400) {
                    setServerError(err.response.data)
                }
            }
        }

    });

    if (user) {
        return <Navigate to="/home" />
    }

    return (
        <>
            <h1 className="text-center pt-2">Sign Up</h1>
            <p className="text-center pt-2">its your turn to create acount , ITS FREE </p>

            {serverError && <div className="alert alert-danger container text-center">{serverError}</div>}

            <form onSubmit={form.handleSubmit} noValidate autoComplete="off" className="p-5 rounded" style={{ width: "85vw", margin: "auto", backgroundColor: "#e1dcdc" }} >


                <div className="nameErea d-flex gap-2">
                    <Input
                        {...form.getFieldProps("name.first")}
                        type="name"
                        label="First Name"
                        required
                        error={form.touched.name && form.errors.first}
                    />
                    <Input
                        {...form.getFieldProps("name.middle")}
                        type="name"
                        label="Middle Name"
                    />
                    <Input
                        {...form.getFieldProps("name.last")}
                        type="name"
                        label="Last Name"
                        required
                        error={form.touched.name && form.errors.last}
                    />
                </div>
                <Input
                    {...form.getFieldProps("phone")}
                    type="phone"
                    label="Phone Number"
                    required

                />
                <Input
                    {...form.getFieldProps("email")}
                    type="email"
                    label="Email"
                    required
                    error={form.touched.email && form.errors.email}
                />
                <Input
                    {...form.getFieldProps("password")}
                    type="text"
                    label="Password"
                    required
                    error={form.touched.password && form.errors.password}
                />
                <div className="d-flex gap-2 flex-wrap">
                    <Input
                        {...form.getFieldProps("image.url")}
                        type="text"
                        label="Image Url"
                    />
                    <Input
                        {...form.getFieldProps("image.alt")}
                        type="text"
                        label="Image Alt"
                    />
                </div>
                <div className="addressErea d-flex flex-wrap gap-2">
                    <Input
                        {...form.getFieldProps("address.state")}
                        type="taxt"
                        label="State"

                    />
                    <Input
                        {...form.getFieldProps("address.country")}
                        type="text"
                        label="Country"
                        required
                        error={form.touched.address && form.errors.country}

                    />
                    <Input
                        {...form.getFieldProps("address.city")}
                        type="text"
                        label="City"
                        required
                        error={form.touched.address && form.errors.city}
                    />
                    <Input
                        {...form.getFieldProps("address.street")}
                        type="text"
                        label="Street"
                        required
                        error={form.touched.address && form.errors.street}
                    />
                    <Input
                        {...form.getFieldProps("address.houseNumber")}
                        type="number"
                        label="House Number"
                        required
                        error={form.touched.address && form.errors.houseNumber}
                    />
                    <Input
                        {...form.getFieldProps("address.zip")}
                        type="number"
                        label="Zip"
                        required
                        error={form.touched.address && form.errors.zip}
                    />
                </div>
                <label htmlFor="checkbox">Business Profile</label>
                <input type="checkbox" id="checkbox" onChange={(e) => {
                    setbiz(e.target.checked)
                }} />


                <div className="my-2">
                    <button type="submit" disabled={!form.isValid} className="btn btn-dark">
                        Sign Up
                    </button>
                </div>
            </form >
        </>
    );
};

export default SignUp;
