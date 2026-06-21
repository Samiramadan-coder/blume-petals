import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import FooterNavLink from "./app-footer/footer-nav-link";

export default function AppFooter() {
  return (
    <footer className="py-16 bg-foreground">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              Shop
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">Bouquets</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Preserved</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Gifting</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Custom Builder</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Seasonal</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Occasions</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              Company
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">About Us</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Our Story</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Careers</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Contact</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              Support
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink href="">Help Center</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Track Order</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Returns & Refunds</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">FAQ</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Privacy Policy</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="">Terms</FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-primary">
              Connect
            </h4>
            <nav>
              <ul className="space-y-2.5">
                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaInstagram className="text-primary" />
                      </div>
                    }
                  >
                    @blumepetals
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaWhatsapp className="text-primary" />
                      </div>
                    }
                  >
                    WhatsApp Us
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaEnvelope className="text-primary" />
                      </div>
                    }
                  >
                    hello@blumepetals.ae
                  </FooterNavLink>
                </li>

                <li>
                  <FooterNavLink
                    href=""
                    icon={
                      <div className="bg-white/10 w-7 h-7 flex items-center justify-center rounded-full">
                        <FaPhoneAlt className="text-primary" />
                      </div>
                    }
                  >
                    +971 50 123 4567
                  </FooterNavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
