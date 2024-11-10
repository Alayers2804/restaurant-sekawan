"use client";
import apiAxios from "../api/api";
import { useEffect, useState } from "react";

const usePostReview = (restaurantId) => {
    const [formData, setFormData] = useState({ name: '', review: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        try {
            const response = await apiAxios.post(`/review`, {
                id: restaurantId,
                ...formData
            });

            if (response.data && response.data.error === false) {
                setFormData({ name: '', review: '' });  // Clear form
                window.location.reload();
            } else {
                throw new Error('Failed to post review');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, loading, error };
};

export default usePostReview;