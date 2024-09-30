import { useFormik } from "formik";
import Joi, { number } from "joi";
import { useState } from "react";

import Input from "../commponets/common/input";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

function SingIn() {
    const { login, user } = useAuth();


    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            password: "",
        },
        validate(values) {
            const schema = Joi.object({
                email: Joi.string().required().min(5).email({ tlds: { allow: false } }).label("Email"),
                password: Joi.string().min(7).max(20).pattern(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/).required().label("Password"),
            });

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
                await login(values);
                navigate("/home");
            } catch (err) {
                if (err.response?.status == 400) {
                    setServerError(err.response.data)
                }
            }
        }
    })
    if (user) {
        return <Navigate to="/home" />
    }

    return <>
        <h1 className="text-center pt-2">Sign In</h1>
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off" className="p-5 "  >
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            <Input
                {...form.getFieldProps("email")}
                label="Email"
                type="text"
                placeholder="email"
                required
                error={form.touched.email && form.errors.email}
            ></Input>
            <Input
                {...form.getFieldProps("password")}
                label="Password"
                type="text"
                placeholder="password"
                required
                error={form.touched.password && form.errors.password}
            ></Input>

            <button type="submit" disabled={!form.isValid} className="btn btn-dark">Sing In</button>
        </form >
    </>
}

export default SingIn;