import { baseApi } from "@/app/api/baseApi";


export const gLoginUser = async (formData: any) => {
    const res = await fetch(`${baseApi}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
    });

    const userInfo = await res.json();
    return userInfo;
};