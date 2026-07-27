import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

interface Props {
    initialData?: {
        name:string;
        email?:string;
        phone?:string;
        role?:string;
    };

    onSubmit:(data:{
        name:string;
        email?:string;
        phone?:string;
        role?:string;
    })=>void;

    loading?:boolean;
}

export default function ContactForm({
    initialData,
    onSubmit,
    loading=false,
}:Props){

    const [name,setName] = useState(
        initialData?.name ?? ""
    );

    const [email,setEmail] = useState(
        initialData?.email ?? ""
    );

    const [phone,setPhone] = useState(
        initialData?.phone ?? ""
    );

    const [role,setRole] = useState(
        initialData?.role ?? ""
    );

  return (
    <div className="space-y-4">
      <Input
    placeholder="Name"
    value={name}
    onChange={setName}
    />

    <Input
        placeholder="Email"
        value={email}
        onChange={setEmail}
    />

    <Input
        placeholder="Phone"
        value={phone}
        onChange={setPhone}
    />

    <Input
        placeholder="Role"
        value={role}
        onChange={setRole}
    />

      <Button
        onClick={() =>
          onSubmit({
            name,
            email,
            phone,
            role,
          })
        }
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : initialData
            ? "Update Contact"
            : "Create Contact"}
      </Button>
    </div>
  );
}