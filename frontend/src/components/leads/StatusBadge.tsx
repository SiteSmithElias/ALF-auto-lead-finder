import type { LeadStatus } from "../../types/lead";


const styles = {
    NEW:"bg-blue-100 text-blue-700",
    CONTACTED:"bg-yellow-100 text-yellow-700",
    REJECTED:"bg-red-100 text-red-700",
    CLIENT:"bg-green-100 text-green-700",
    UNKNOWN:"bg-purple-100 text-purple-700",
    IGNORE:"bg-gray-100 text-gray-700"
};

export default function StatusBadge({
    status
}:{
    status:LeadStatus
}){
    return (
        <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
            {status}
        </span>
    )
}