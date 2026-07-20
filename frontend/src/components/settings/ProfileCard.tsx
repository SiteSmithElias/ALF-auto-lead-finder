import { useState } from "react";

export default function ProfileCard() {
  const [name, setName] = useState("ALF User");

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-5">
      <h2 className="text-lg font-semibold">
        Profile
      </h2>

      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          A
        </div>

        <button className="px-4 py-2 border border-[var(--border)] rounded-lg">
          Upload Picture
        </button>
      </div>

      <div>
        <label className="block mb-2 opacity-70">
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        />
      </div>

      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
        Save Profile
      </button>
    </div>
  );
}