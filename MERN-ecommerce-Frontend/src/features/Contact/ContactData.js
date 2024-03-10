import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

const ContactFeildData = [
  {
    icon: <MailOutlineIcon className="iconBorder" />,
    headerTxt: "Chat to us",
    messageTxt: "our Triendly team is here to help",
    footerTxt: "info@nextintech.in",
  },
  {
    icon: <LocationOnIcon className="iconBorder" />,
    headerTxt: "Visit us",
    messageTxt: "Come say hello at our office HQ.",
    footerTxt: "Kolkata West Bengal, India",
  },
  {
    icon: <PhoneIcon className="iconBorder" />,
    headerTxt: "Call us",
    messageTxt: "Mon-Fri from 8am to 5pm.",
    footerTxt: "+91 99009 00990",
  },
];

const SocialMediaData = [
  { icon: <FacebookIcon className="iconBorder" />, link: "" },
  { icon: <WhatsAppIcon className="iconBorder" />, link: "" },
  { icon: <TwitterIcon className="iconBorder" />, link: "" },
];

export { SocialMediaData, ContactFeildData };
