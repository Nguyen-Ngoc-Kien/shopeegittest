// import { headers } from "next/headers";
import { POST, GET } from "@/services/apiServices";

export const getUserProfile = async () => {
  // const cookieHeaders = headers();
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwidXNlcm5hbWUiOiJEdW5nIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInRva2VuX3R5cGUiOjAsImFjY291bnRfc3RhdHVzIjowLCJleHAiOjE3MzI3ODc5MjEsImlhdCI6MTczMjc4NzAyMX0.nLYSnE-3aFkdS8TLTAjzTqoFd65UsQCSi6IpAcnXTmS89eW3aWL79r_F4MTRpO5OPCm3u18qbBP4YLNJnAqKjg'

  const customHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await GET("/me", { headers: customHeaders });
};