import PrivateRoute from "@/components/PrivateRoute";
import ChangePassword from "@/components/User/ChangePassword";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <div>
      <PrivateRoute>
        <ChangePassword />
      </PrivateRoute>
    </div>
  );
};

export default ChangePasswordPage;
