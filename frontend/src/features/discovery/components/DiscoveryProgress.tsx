interface DiscoveryProgressProps {
    progress: number;
    found: number;
    current: string;
}

export default function DiscoveryProgress({ progress, found, current }: DiscoveryProgressProps) {
    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-4">

            <h2 className="font-semibold">
                Discovery running...
            </h2>

            <p className="opacity-70">
                Searching: {current}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p>
                Businesses found: <strong>{found}</strong>
            </p>

        </div>
    );
}