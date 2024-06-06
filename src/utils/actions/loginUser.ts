

export const gLoginUser = async (formData: any) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
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