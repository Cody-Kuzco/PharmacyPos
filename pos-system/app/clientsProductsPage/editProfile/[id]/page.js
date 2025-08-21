import React from "react";
import { fetchUserById } from "@/app/api/register/route";
import EditProfileUsers from "@/components/EditProfileUsers";
const page = async ({ params: { id } }) => {
  const user = await fetchUserById(id);
  const { username, bio, phone, email } = user;
  return (
    <div>
      <EditProfileUsers
        id={id.toString()}
        username={username}
        email={email}
        phone={phone}
        bio={bio}
      />
    </div>
  );
};

export default page;
