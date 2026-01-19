import { FaTableColumns } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <a href="#"><FaTableColumns className="text-[#121212] " /></a>
      <div className="h-6 w-px bg-[#121212]/40 mx-3" aria-hidden="true" />
      <span className="text-[#121212] font-medium">Documents</span>
    </div>
  );
}
