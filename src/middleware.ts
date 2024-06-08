export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/myProfile",
    "/trip/create-trip",
    `/trip/:path*`,
    "/auth/change-password",
    
  ],
};



