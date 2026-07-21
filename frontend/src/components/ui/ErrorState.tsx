interface Props {
    title?: string;
    message?: string;
}

export default function ErrorState({
    title = "Error",
    message = "Something went wrong",
}: Props) {
    return (
        <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
            <h3 className="font-semibold">
                {title}
            </h3>

            <p>{message}</p>
        </div>
    );
}