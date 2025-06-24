import ListPaymentMethod from "@/components/list-payment-method";
import { LogoWithLink } from "@/components/logo";
import { COMPANY_NAME, CONTACT_EMAIL } from "@/config";
import { Link } from "@tanstack/react-router";

const MENU = [
  {
    title: "MORE INFO",
    items: [
      { title: "Order Tracking", link: "/track-order" },
      { title: "About Us", link: "/about-us" },
      { title: "Blogs", link: "/blogs" },
      { title: "Contact", link: "/contact-us" },
      { title: "FAQs", link: "/faqs" },
    ],
  },
  {
    title: "POLICY",
    items: [
      { title: "Terms of Service", link: "/terms-of-service" },
      { title: "Privacy Policy", link: "/privacy-policy" },
      { title: "Shipping Policy", link: "/shipping-policy" },
      {
        title: "Return and Refund Policy",
        link: "/refund-and-cancellation-policy",
      },
      {
        title: "Billing Terms and Conditions",
        link: "/billing-terms-and-conditions",
      },
      { title: "Disclaimer", link: "/disclaimer" },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-primary text-background border-border ">
      <div className="bg-background text-primary">
        {" "}
        <svg
          className="h-10 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 226.97"
          width="100%"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fill-opacity="1"
            d="M0,81,21.8,70.3C43.6,60,87,38,131,27.7,174.5,17,218,17,262,49c43.5,32,87,96,131,106.7C436.4,166,480,124,524,97c43.3-27,87-37,131-26.7,43.2,10.7,87,42.7,130,64C829.1,156,873,166,916,161c44-5,88-27,131-58.7C1090.9,70,1135,28,1178,17c43.8-11,87,11,131,26.7,43.7,16.3,87,26.3,109,32l22,5.3V241H0Z"
            transform="translate(0 -14.03)"
          ></path>
        </svg>
      </div>

      <div className="py-8 px-4 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 flex flex-col items-start justify-start">
            <LogoWithLink />

            <p className="text-sm mt-2">Email: {CONTACT_EMAIL}</p>
            {/* <div className="flex space-x-4 mt-4 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-blue-500" />
          <FaYoutube className="cursor-pointer hover:text-red-500" />
          <FaTiktok className="cursor-pointer hover:text-black" />
        </div> */}
          </div>

          {/* More Info */}
          {MENU.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl mb-4 font-bold">{item.title}</h3>
              <ul className="mt-2 space-y-4  text-sm">
                {item.items.map((subItem) => (
                  <li
                    key={subItem.title}
                    className="hover:underline cursor-pointer"
                  >
                    <Link to={subItem.link} key={subItem.title}>
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Policy */}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-4 flex flex-col md:flex-row md:justify-between justify-center gap-2 items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.34em"
                height="1em"
                viewBox="0 0 640 480"
              >
                <path fill="#bd3d44" d="M0 0h640v480H0" />
                <path
                  stroke="#fff"
                  strokeWidth="37"
                  d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
                />
                <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
                <marker id="flagUs4x30" markerHeight="30" markerWidth="30">
                  <path fill="#fff" d="m14 0l9 27L0 10h28L5 27z" />
                </marker>
                <path
                  fill="none"
                  markerMid="url(#flagUs4x30)"
                  d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z"
                />
              </svg>
            </span>
            <span>English (EN) | USD</span>
          </div>
          <ListPaymentMethod />
        </div>
      </div>
      <p className="mt-2 md:mt-0 text-center text-xs p-2 ">
        © {new Date().getFullYear()} <strong>{COMPANY_NAME} LLC</strong>. All
        rights reserved.
      </p>
    </footer>
  );
}
