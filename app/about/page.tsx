import { GENERICS } from "@/constants/shared";
import { pageService } from "@/services/page.service";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

export default async function AboutUsPage() {
  const page = await pageService.getPageData(GENERICS.about);
  if (!page) return notFound();

  return parse(page.body);
}
