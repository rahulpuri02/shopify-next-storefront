import React from "react";
import { Globe } from "lucide-react";
import { navigationService } from "@/services/navigation.service";
import { MENUS } from "@/constants/shopify";
import { FOOTER } from "@/constants/shared";
import VisaCardIcon from "@/components/icons/visa-card-icon";
import MasterCardIcon from "@/components/icons/master-card-icon";

async function Footer() {
  const footerMenu = await navigationService.getMenu(MENUS.footer);
  if (!footerMenu.length) return null;

  return (
    <footer className="mt-20 w-full bg-[#1d3e88] px-6 py-10 text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
        <div className="w-full">
          <h2 className="max-w-[320px] text-3xl leading-snug font-medium">
            {FOOTER.signUpNewsletter}
          </h2>

          <form className="mt-3">
            <input
              type="email"
              className="mb-4 w-full border-b border-white bg-transparent py-2 text-white placeholder-white outline-none"
              placeholder={FOOTER.emailPlaceholder}
            />
            <label className="flex items-center gap-2 text-xs leading-tight tracking-wider uppercase">
              <input type="checkbox" className="mt-[2px]" />
              {FOOTER.termsLabel}
            </label>
          </form>

          <div className="mt-6 flex items-center gap-2 text-sm font-bold">
            <Globe size={14} />
            {FOOTER.languageSelector}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pl-20 md:grid-cols-4">
          {footerMenu.map((col) => (
            <div key={col.title} className="w-full">
              <h4 className="mb-4 text-sm font-medium uppercase">{col.title}</h4>
              <ul className="flex flex-col space-y-1.5 text-sm">
                {col.items?.map((subItem) => (
                  <li className="cursor-pointer" key={subItem.title}>
                    {subItem.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex items-start gap-6 pt-1">
            <VisaCardIcon />
            <MasterCardIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
