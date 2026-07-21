import api from "./client";

import type {
    Business,
    BusinessDetail
} from "../types/business";


interface BusinessParams {
    page?:number;
    limit?:number;
    category?:string;
    city?:string;
    hasWebsite?:boolean;
}

interface BusinessListResponse {
    items:Business[];
}

export const getBusinesses =
async(
    params?:BusinessParams
):Promise<BusinessListResponse>=>{
    const res = await api.get(
        "/businesses",
        {
            params
        }
    );

    return res.data;
};

export const getBusiness =
async(
    id:number
):Promise<BusinessDetail>=>{
    const res = await api.get(
        `/businesses/${id}`
    );

    return res.data;

};