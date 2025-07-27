import { pageService } from "@/services/page.service";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};

async function Page({ params }: ComponentProps) {
  const pageHandle = (await params).handle;
  const page = await pageService.getPageData(pageHandle);
  if (!page) return notFound();

  return parse(page.body);
}

export default Page;
