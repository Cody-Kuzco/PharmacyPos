import { fetchProducts } from "@/app/api/fetchProduct/route";
import { fetchUser } from "@/app/api/user/route";
import Users from "@/components/Users";
import React from "react";

const page = async () => {
  const users = await fetchUser();
//   console.log(users)
  
  return (
    <div>
      <Users users = {users} />
    </div>
  );
};

export default page;
