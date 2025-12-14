import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <label htmlFor="searchNote" className="relative">
      <Search
        className="input-icon absolute left-4 top-center opacity-50"
        size={18}
      />
      <input
        type="text"
        name="searchNote"
        id="searchNote"
        placeholder="Search notes..."
        className="ps-12"
      />
    </label>
  );
}
