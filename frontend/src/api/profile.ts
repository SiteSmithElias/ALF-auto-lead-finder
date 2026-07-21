import api from "./client";
import type {
    Profile
} from "../types/profile";


export const getProfile =
async():Promise<Profile>=>{
    const res = await api.get(
        "/profile"
    );

    return res.data;
};

export const updateProfile =
async(
    data:Partial<Profile>
):Promise<Profile>=>{
    const res = await api.patch(
        "/profile",
        data
    );

    return res.data;
};

export const uploadAvatar =
async(
    file:File
)=>{
    const formData = new FormData();
    formData.append(
        "file",
        file
    );

    const res = await api.post(
        "/profile/avatar",
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data"
            }
        }
    );

    return res.data;
};