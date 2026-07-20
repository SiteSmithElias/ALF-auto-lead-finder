import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer px-4 py-5"
        >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                A
            </div>

            <span className="text-xl font-bold">
                ALF
            </span>
        </div>
    );
}