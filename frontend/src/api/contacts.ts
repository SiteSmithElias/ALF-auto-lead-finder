import api from "./client";
import type {
    Contact
} from "../types/contact";


export const getLeadContacts =
async(
    leadId:number
):Promise<Contact[]>=>{
    const res = await api.get(
        `/leads/${leadId}/contacts`
    );

    return res.data;
};

export const createContact =
async(
    leadId:number,
    data:Partial<Contact>
):Promise<Contact>=>{
    const res = await api.post(
        `/leads/${leadId}/contacts`,
        data
    );

    return res.data;
};

export const updateContact =
async(
    id:number,
    data:Partial<Contact>
):Promise<Partial<Contact>>=>{
    const res = await api.patch(
        `/contacts/${id}`,
        data
    );

    return res.data;
};

export const deleteContact =
async(
    id:number
)=>{
    const res = await api.delete(
        `/contacts/${id}`
    );

    return res.data;
};