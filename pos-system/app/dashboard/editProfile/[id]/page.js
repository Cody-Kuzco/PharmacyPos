import React from "react";
import EditProfile from "@/components/EditProfile";
import { fetchUserById } from "@/app/api/register/route";

const page = async ({ params: { id } }) => {
  const user = await fetchUserById(id);

  // console.log(user);
  const { username, bio, phone, email } = user;
  return (
    <div>
      <EditProfile
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
