interface Props {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong",
}: Props) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
      <h3 className="font-semibold">
        Error
      </h3>

      <p>
        {message}
      </p>
    </div>
  );
}