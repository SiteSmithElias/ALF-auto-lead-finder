import type { Lead } from "../../types/lead";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";


export default function LeadTable({
    leads
}:{
    leads:Lead[]
}){

    const navigate = useNavigate();

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-[var(--border)] text-left">
                        <th className="p-4">
                            Business
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Contact
                        </th>
                        <th>
                            Score
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                {leads.map((lead)=>(
                    <tr
                    key={lead.id}
                    onClick={()=>navigate(`/leads/${lead.id}`)}
                    className="border-b border-[var(--border)] hover:bg-gray-50 cursor-pointer"
                    >
                        <td className="p-4">
                            {lead.business}
                        </td>
                        <td>
                            {lead.category}
                        </td>
                        <td>
                            {lead.phone || lead.email || "-"}
                        </td>
                        <td>
                            {lead.score}
                        </td>
                        <td>
                            <StatusBadge status={lead.status}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}