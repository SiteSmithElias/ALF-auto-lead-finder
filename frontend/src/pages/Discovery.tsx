import { useState } from "react";
import SearchInput from "../components/discovery/SearchInput";
import DiscoveryProgress from "../components/discovery/DiscoveryProgress";


export default function Discovery() {

    const [queries, setQueries] = useState([
        "plumbers Brussels"
    ]);

    const [running, setRunning] = useState(false);


    function updateQuery(index: number, value: string) {
        const copy = [...queries];
        copy[index] = value;
        setQueries(copy);
    }


    function addQuery() {
        setQueries([...queries, ""]);
    }


    function removeQuery(index: number) {
        setQueries(
            queries.filter((_, i) => i !== index)
        );
    }


    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Discovery
                </h1>

                <p className="opacity-70 mt-2">
                    Find businesses using Google Maps discovery
                </p>
            </div>


            {!running && (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-5">

                    <h2 className="font-semibold">
                        Search queries
                    </h2>


                    {queries.map((query, index) => (
                        <SearchInput
                            key={index}
                            value={query}
                            onChange={(value) => updateQuery(index, value)}
                            onRemove={() => removeQuery(index)}
                        />
                    ))}


                    <button
                        onClick={addQuery}
                        className="text-blue-600"
                    >
                        + Add query
                    </button>


                    <div>
                        <label className="block mb-2 opacity-70">
                            Maximum results
                        </label>

                        <input
                            type="number"
                            min="1"
                            defaultValue="100"
                            className="w-32 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                        />
                    </div>


                    <button
                        onClick={() => setRunning(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Start Search
                    </button>

                </div>
            )}


            {running && (
                <DiscoveryProgress
                    progress={72}
                    found={183}
                    current="plumbers Brussels"
                />
            )}

        </div>
    );
}