import type { User } from "@/types";
import React, { type FC } from "react";
import FormIcon from "./form-icon";
import {
  Briefcase,
  Building2,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  UserRound,
} from "lucide-react";

interface EditUserTableFormProps {
  userData: User;
}

const UserDetailsInfo: FC<EditUserTableFormProps> = ({ userData }) => {
  return (
    <div className="w-full">
      <h2 className="text-center font-semibold text-2xl mb-5">User Info</h2>
      <div className="w-full space-y-4">
        {/* Profile Picture */}
        <div>
          <img
            src={userData.image}
            alt={userData.fullName}
            className="h-20 w-20 rounded-full object-cover mx-auto"
          />
        </div>
        {/* Full Name  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <UserRound className="w-5 h-5" />
          <p>{userData.fullName}</p>
        </div>
        {/* Email  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <Mail className="w-5 h-5" />
          <p>{userData.email}</p>
        </div>
        {/* Phone  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <Phone className="w-5 h-5" />
          <p>{userData.phone}</p>
        </div>
        {/* country  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <MapPin className="w-5 h-5" />
          <p>{userData.country}</p>
        </div>
        {/* City  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <Building2 className="w-5 h-5" />
          <p>{userData.city}</p>
        </div>
        {/* State  */}
        <div className="relative py-3.5 px-3 text-gray-800 flex items-center gap-2 border backdrop-blur-sm bg-white/40 border-gray-300 rounded-xl ">
          <MapPinHouse className="w-5 h-5" />
          <p>{userData.state}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsInfo;
