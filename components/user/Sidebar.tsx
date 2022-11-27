import { FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { CgPassword } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";
import { BiHelpCircle } from "react-icons/bi";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden md:block flex-1 bg-white h-[calc(100vh-50px)] sticky top-[50px] mt-16">
      <div className="text-[#555] text-base font-medium pt-5">
        <div className="cursor-pointer">
          <div
            id="sidebarListItem"
            title="Home"
            className="flex items-center rounded-r-full pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
            onClick={() => {
              router.push("/account/home");
            }}
          >
            <FaUserCircle className="text-2xl" />
            <h3 className="ml-4">Home</h3>
          </div>

          <div
            id="sidebarListItem"
            title="Personal information"
            className="flex items-center rounded-lg pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
            onClick={() => {
              router.push("/account/profile");
            }}
          >
            <ImProfile className="text-2xl" />
            <h3 className="ml-4">Personal information</h3>
          </div>

          <div
            id="sidebarListItem"
            title="Change password"
            className="flex items-center rounded-lg pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
            onClick={() => {
              router.push("/account/change-password");
            }}
          >
            <CgPassword className="text-2xl" />
            <h3 className="ml-4">Change password</h3>
          </div>

          <div
            id="sidebarListItem"
            title="Payment and subscription package"
            className="flex items-center rounded-lg pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
            onClick={() => {
              router.push("/account/payment/payment-package");
            }}
          >
            <MdPayment className="text-2xl" />
            <h3 className="ml-4">Payment and subscription package</h3>
          </div>

          <div
            id="sidebarListItem"
            title="Buy package"
            className="flex items-center rounded-lg pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
            onClick={() => {
              router.push("/account/upgrade");
            }}
          >
            <GiUpgrade className="text-2xl" />
            <h3 className="ml-4">Buy package</h3>
          </div>

          <div className="border-t border-solid border-[rgb(218,220,224)] box-border h-2 mt-2"></div>

          <div
            id="sidebarListItem"
            title="Help"
            className="flex items-center rounded-lg pl-6 py-3 pr-4 hover:bg-[#e5e7eb]"
          >
            <BiHelpCircle className="text-2xl" />
            <h3 className="ml-4">Help</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
