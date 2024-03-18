import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/api/auth/register", data),
};

export default authServices;
