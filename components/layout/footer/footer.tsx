import MasterCardIcon from "@/components/icons/master-card-icon";
import VisaCardIcon from "@/components/icons/visa-card-icon";
import { FOOTER } from "@/constants/shared";
import { MENUS } from "@/constants/shopify";
import { generatePaths } from "@/lib/utils";
import { navigationService } from "@/services/navigation.service";
import { ChevronsLeftRight } from "lucide-react";
import Link from "next/link";
import FooterAccordian from "./footer-accordian";
import NewsletterForm from "./newsletter-form";

async function Footer() {
  const footerMenu = await navigationService.getMenu(MENUS.footer);
  if (!footerMenu.length) return null;

  return (
    <footer className="mt-20 w-full bg-[#1d3e88] px-6 py-10 text-white">
      <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-[1fr_2fr]">
        <div className="w-full">
          <h2 className="max-w-[320px] text-2xl leading-snug font-medium md:text-3xl">
            {FOOTER.signUpNewsletter}
          </h2>
          <NewsletterForm />
          <Link
            href={FOOTER.authorContact}
            className="mt-6 flex items-center gap-2 text-sm font-bold uppercase"
          >
            <ChevronsLeftRight className="h-auto w-5" size={14} />
            {FOOTER.siteAuthor}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 pl-20 md:grid-cols-4">
          {footerMenu.map((col, i) => (
            <div key={`${col.title}-${i}`} className="w-full">
              <h4 className="mb-4 text-sm font-medium uppercase">{col.title}</h4>
              <ul className="flex flex-col space-y-1.5 text-sm">
                {col.items?.map((subItem) => (
                  <li className="cursor-pointer" key={subItem.title}>
                    <Link href={generatePaths(subItem.path, subItem.title)}>{subItem.title}</Link>
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

      {/* [/*Mobile Layout /*] */}

      <div className="flex flex-col md:hidden">
        <div className="w-full">
          <h2 className="max-w-[320px] text-3xl leading-snug font-medium">
            {FOOTER.signUpNewsletter}
          </h2>
          <NewsletterForm />
          <FooterAccordian footerMenu={footerMenu} />
          <div className="mt-8 flex items-center justify-between">
            <Link
              href={FOOTER.authorContact}
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <ChevronsLeftRight className="h-auto w-5" />
              {FOOTER.siteAuthor}
            </Link>
            <div className="flex items-start gap-3">
              <VisaCardIcon />
              <MasterCardIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
