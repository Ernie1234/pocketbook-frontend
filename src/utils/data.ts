import { Banknote, Bolt, HandCoins, LineChart, UserRound } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { BsHouse } from "react-icons/bs";

export const navLinks = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/blog",
    text: "Blog",
  },
  {
    path: "/pricing",
    text: "Pricing",
  },
  {
    path: "/about",
    text: "About Us",
  },
];
export const dashboardLinks = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: BsHouse,
  },
  {
    path: "/dashboard/commodities",
    text: "Commodity Market",
    icon: ShoppingBasket,
  },
  {
    path: "/dashboard/portfolio",
    text: "Portfolio",
    icon: LineChart,
  },
  {
    path: "/dashboard/transaction",
    text: "Transaction",
    icon: HandCoins,
  },
  {
    path: "/dashboard/setting/profile",
    text: "Setting",
    icon: Bolt,
  },
];
export const adminLinks = [
  {
    path: "/admin/sell",
    text: "Sell",
    icon: Banknote,
  },
  {
    path: "/admin/users",
    text: "All User",
    icon: UserRound,
  },
];

export const testimonialData = [
  {
    name: "Ore Bakare",
    img: "https://as2.ftcdn.net/v2/jpg/02/21/09/69/1000_F_221096959_yi4W8gOMJd3VeApzKjgoB2dgB1wyDun2.jpg",
    text: "Exceptional Service! I recently had the pleasure of working with Regtech for legal assistance, and I couldn't be more impressed.",
    rating: 4,
  },
  {
    name: "Kelvin Ogbomosho",
    img: "https://cms.podium.com/wp-content/uploads/2022/04/services.png",
    text: "Exceptional Service! I recently had the pleasure of working with Regtech for legal assistance, and I couldn't be more impressed.",
    rating: 4,
  },
  {
    name: "Tobi Joshua",
    img: "https://media.istockphoto.com/id/1363697808/photo/man-and-woman-having-a-meeting.jpg?s=612x612&w=0&k=20&c=l7MS9s0U-uI0frcbDVWQH31j-wTutp-_ZS-g2gTVb6o=",
    text: "Exceptional Service! I recently had the pleasure of working with Regtech for legal assistance, and I couldn't be more impressed.",
    rating: 4,
  },
];

export const pricingData = [
  {
    title: "Standard",
    subTitle: "Perfect for Individual",
    price: 39,
    features: [
      "instantly accept payment globally",
      "automated sales compliance",
      " instantly accept payment globally",
    ],
  },
  {
    title: "Professional",
    subTitle: "Perfect for Growing Business",
    price: 99,
    features: [
      "All features from standard",
      "Sell digital downloads",
      "Launch eCommerce stores",
      "Discounts & Coupon codes",
    ],
  },
  {
    title: "Agency Plan",
    subTitle: "Perfect for Large Companies",
    price: 499,
    features: [
      "All features from standard & Pro",
      "No-code checkout forms",
      "Sales tax & VAT collections",
      "Support major payment methods",
      "Growth with magnets",
      "Recover lost payments",
      "Real-time revenue insight",
    ],
  },
];
export const productData = [
  {
    id: 1,
    name: "Maize",
    description: "Amazing crunchy maize",
    quantity: "3",
    price: "960",
    date_created: "2024-02-24T14:15:22Z",
  },
  {
    id: 2,
    name: "Beans",
    description: "Good beans",
    quantity: "1",
    price: "9300",
    date_created: "2024-08-24T14:15:22Z",
  },
];
