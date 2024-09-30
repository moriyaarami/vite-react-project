import { useFormik } from "formik";
import Input from "../commponets/common/input";
import Joi from "joi";
import cardsService from "../service/cardService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateCard() {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
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
                zip: 0
            }
        },
        validate(values) {
            const schema = Joi.object({
                title: Joi.string().min(2).max(256).required(),
                subtitle: Joi.string().min(2).max(256).required(),
                description: Joi.string().min(2).max(1024).required(),
                phone: Joi.string().min(9).max(11).pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).required(),
                email: Joi.string().email({ tlds: { allow: false } }).pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).min(5).required(),
                web: Joi.string().min(14).allow("").pattern(/(http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

                ),
                image: Joi.object({
                    url: Joi.string().min(14).allow(""),
                    alt: Joi.string().min(2).max(256).allow(""),
                }),
                address: Joi.object({
                    state: Joi.string().allow(""),
                    country: Joi.string().required(),
                    city: Joi.string().required(),
                    street: Joi.string().required(),
                    houseNumber: Joi.number().required(),
                    zip: Joi.number().allow(""),
                }),

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
                await cardsService.createCard(values);
                alert("Your card has been successfully created")
                navigate("/my-card")
            } catch (err) {
                if (err.response?.status === 400) {
                    setServerError(err.response.data)
                }
            }
        }
    })

    return (<>
        <h3 className="text-center p-3">Lets create your card</h3>
        {serverError ?? <div className="alert alert-danger">{serverError}</div>}
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off" className="p-5 rounded" style={{ width: "60vw", margin: "auto", backgroundColor: "#e1dcdc" }} >
            <div className="d-flex gap-2">
                <Input
                    {...form.getFieldProps("title")}
                    type="text"
                    label="Title"
                    required
                    error={form.touched.title && form.errors.title}
                />
                <Input
                    {...form.getFieldProps("subtitle")}
                    type="text"
                    label="Subtitle"
                    required
                    error={form.touched.subtitle && form.errors.subtitle}
                />
                <Input
                    {...form.getFieldProps("description")}
                    type="text"
                    label="Description"
                    required
                    error={form.touched.description && form.errors.description}
                />
            </div>
            <Input
                {...form.getFieldProps("phone")}
                type="phone"
                label="Phone"
                required
                error={form.touched.phone && form.errors.phone}
            />
            <Input
                {...form.getFieldProps("email")}
                type="email"
                label="Email"
                required
                error={form.touched.email && form.errors.email}
            />
            <Input
                {...form.getFieldProps("web")}
                type="text"
                label="web"
            />
            <div className="d-flex gap-2">
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
            <div className="d-flex gap-2 flex-wrap">
                <Input
                    {...form.getFieldProps("address.state")}
                    type="text"
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

                />
                <Input
                    {...form.getFieldProps("address.zip")}
                    type="number"
                    label="Zip"
                />
            </div>
            <button type="submit" disabled={!form.isValid} className="btn btn-dark">Create</button>

        </form>




    </>)
};

export default CreateCard;