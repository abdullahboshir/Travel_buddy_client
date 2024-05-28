

export const loginUser = async (formData: any) => {
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
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