import { pageService } from "@/services/page.service";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { cache } from "react";

type ComponentProps = {
  params: Promise<{ handle: string }>;
};

const getPage = cache((handle: string) => pageService.getPageData(handle));

export const generateMetadata = async ({ params }: ComponentProps) => {
  const { handle } = await params;
  const page = await getPage(handle);
  if (!page) {
    return {
      title: "Page Not Found | CN 74®",
    };
  }
  return {
    title: `${page.title} | CN 74®`,
  };
};

async function Page({ params }: ComponentProps) {
  const pageHandle = (await params).handle;
  const page = await getPage(pageHandle);
  if (!page) return notFound();

  return parse(page.body);
}

export default Page;
