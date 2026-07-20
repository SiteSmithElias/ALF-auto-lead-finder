interface CardProps {
    children: React.ReactNode;
    className?: string;
}


export default function Card({children, className = ""}:CardProps){
    return (
        <div className={`surface rounded-xl p-6 ${className}`}>
            {children}
        </div>
    );
}