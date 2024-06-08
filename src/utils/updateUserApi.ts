import { baseApi } from "@/app/api/baseApi";

const updateUserApi = async (id: string, accessToken: string, data: any) => {
    try {
        const res = await fetch(
            `${baseApi}/api/v1/users//update/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(data),
            }
          );

      

  
      if (!res.ok) {
        throw new Error(`Failed to update user: ${res.statusText}`);
      }
  
      const updatedUser = await res.json(); 
      console.log("User updated successfully:", updatedUser); 
  
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);

    }
  };