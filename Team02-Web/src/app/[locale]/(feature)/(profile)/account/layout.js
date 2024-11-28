import NavbarProfile from "../navbarProfile/page";

export default function AccountLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-15 bg-gray-200 p-4">
        <NavbarProfile />
      </div>

      <div className="w-[1250px] p-4">
        {children}
      </div>
    </div>
  );
}