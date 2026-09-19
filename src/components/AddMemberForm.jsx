import { useState } from "react";

export default function AddMemberForm({
  onAddMember,
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onAddMember(name);

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex gap-3"
    >
      <input
        type="text"
        placeholder="Member name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10"
      />
      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-violet-600"
      >
        Add Member
      </button>
    </form>
  );
}