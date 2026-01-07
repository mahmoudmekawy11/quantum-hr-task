import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoaderCircle,
  User,
  Phone,
  Briefcase,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import FormErrorMessage from "../ui/form-error-message";
import FormInput from "../ui/form-input";
import { userProfileSchema } from "@/utils.ts/forms-schema";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { userProfileInfoSelector } from "@/store/selectors";
import { delayFunction } from "@/services/auth-service";
import { setUserProfileInfo } from "@/store/slices/user-profile-slice";
import { showSuccessToast } from "@/lib/toast.utils";
import FormSubmitButton from "../ui/form-submit-button";
import FormIcon from "../ui/form-icon";
import FormLabel from "../ui/form-label";

type UserProfileFormData = z.infer<typeof userProfileSchema>;

interface UserProfileFormProps {
  onClose?: () => void;
}

const UserProfileForm = ({ onClose }: UserProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const userProfileData = useAppSelector(userProfileInfoSelector);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      ...userProfileData,
    },
  });

  const handleFormSubmit = async (data: UserProfileFormData) => {
    try {
      setIsLoading(true);
      await delayFunction(1500); // Simulate network delay
      dispatch(setUserProfileInfo(data));
      showSuccessToast("Profile updated successfully");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-semibold text-2xl mb-5">
        Edit User Profile
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full  space-y-4"
      >
        {/* Name Input */}
        <div>
          <FormLabel htmlFor="name">Full Name</FormLabel>
          <div className="relative">
            <FormIcon Component={User} />
            <FormInput
              type="text"
              id="name"
              {...register("name")}
              placeholder="Full Name"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>

        {/* Phone Input */}
        <div>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <div className="relative">
            <FormIcon Component={Phone} />
            <FormInput
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="Phone Number"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </div>

        {/* Job Title Input */}
        <div>
          <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
          <div className="relative">
            <FormIcon Component={Briefcase} />
            <FormInput
              type="text"
              id="jobTitle"
              {...register("jobTitle")}
              placeholder="Job Title"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.jobTitle}
            errorMessage={errors.jobTitle?.message}
          />
        </div>

        {/* Years of Experience Input */}
        <div>
          <FormLabel htmlFor="yearsOfExperience">Years of Experience</FormLabel>
          <div className="relative">
            <FormIcon Component={Calendar} />
            <FormInput
              type="number"
              id="yearsOfExperience"
              {...register("yearsOfExperience", { valueAsNumber: true })}
              placeholder="Years of Experience"
              min="0"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.yearsOfExperience}
            errorMessage={errors.yearsOfExperience?.message}
          />
        </div>

        {/* Address Input */}
        <div>
          <FormLabel htmlFor="address">Address</FormLabel>
          <div className="relative">
            <FormIcon Component={MapPin} />
            <FormInput
              type="text"
              id="address"
              {...register("address")}
              placeholder="Address"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.address}
            errorMessage={errors.address?.message}
          />
        </div>

        {/* Working Hours Input */}
        <div>
          <FormLabel htmlFor="workingHours">
            Working Hours per Week (optional)
          </FormLabel>
          <div className="relative">
            <FormIcon Component={Clock} />
            <FormInput
              type="number"
              id="workingHours"
              {...register("workingHours", { valueAsNumber: true })}
              placeholder="Working Hours per Week (optional)"
              min="1"
              max="168"
              className="border-gray-300 "
            />
          </div>
          <FormErrorMessage
            isShow={!!errors.workingHours}
            errorMessage={errors.workingHours?.message}
          />
        </div>

        {/* Submit Button */}
        <FormSubmitButton isLoading={isLoading}>Save Profile</FormSubmitButton>
      </form>
    </div>
  );
};

export default UserProfileForm;
