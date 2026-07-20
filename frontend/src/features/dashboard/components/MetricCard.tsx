interface MetricCardProps {
    title:string;
    value:string | number;
    description?:string;
}


export default function MetricCard({
    title,
    value,
    description
}:MetricCardProps){

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <p className="text-sm opacity-70">
                {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
                {value}
            </h2>

            {
            description &&
            <p className="text-sm mt-2 opacity-60">
                {description}
            </p>
            }
        </div>
    )
}