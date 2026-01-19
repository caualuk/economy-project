import {
  FaChartLine,
  FaRegFolder,
  FaRegUser,
  FaPlusCircle,
  FaTachometerAlt,
} from "react-icons/fa";

const mainMenu = [
  { label: "Entrada | Saída", icon: FaPlusCircle, href: "#" },
  { label: "Dashboard", icon: FaTachometerAlt, href: "#" },
  { label: "Análises", icon: FaChartLine, href: "#" },
  { label: "Projetos", icon: FaRegFolder, href: "#" },
  { label: "Pessoal", icon: FaRegUser, href: "#" },
];

const documentsMenu = [
  { label: "Data Library", href: "#" },
  { label: "Reports", href: "#" },
  { label: "World Assistant", href: "#" },
  { label: "More", href: "#" },
];

const linkStyle = "flex items-center gap-2";
const listStyle =
  "text-white text-[15px] [&>li]:bg-[#17171a] [&>li]:p-2 [&>li]:rounded-lg space-y-4";

export default function SideBar() {
  return (
    <aside className="w-[300px] h-screen bg-transparent p-7">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M5.636 5.636a9 9 0 1 0 12.728 12.728a9 9 0 0 0 -12.728 -12.728" />
          <path d="M16.243 7.757a6 6 0 0 0 -8.486 0" />
        </svg>
        <span className="font-semibold text-[#1717a]">Acme Inc.</span>
      </div>

      {/* Menu principal */}
      <ul className={`mt-5 ${listStyle}`}>
        {mainMenu.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <a href={href} className={linkStyle}>
              <Icon />
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Documents */}
      <div className="mt-10 text-[#1717a]">
        <span className="text-sm opacity-70">Documents</span>

        <ul className="mt-3 space-y-2 text-[14px]">
          {documentsMenu.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="block opacity-80 hover:opacity-100">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
