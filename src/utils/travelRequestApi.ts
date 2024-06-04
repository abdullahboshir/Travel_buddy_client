

export const travelRequestApi = async (formData: any) => {
    const res = await fetch(`http://localhost:5000/api/v1/trips/${formData?.tripId}/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${formData.accessToken}`
        },
        body: JSON.stringify({userId: formData.userId}),
        cache: 'no-store'
    });

    const requestRes = await res.json();
    return requestRes;
};