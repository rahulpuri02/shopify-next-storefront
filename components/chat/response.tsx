"use client";

import { LIVE_SITE_URL } from "@/constants/shared";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps, memo } from "react";
import { Streamdown } from "streamdown";

type ResponseProps = ComponentProps<typeof Streamdown>;

const CustomLink = ({ href, children, ...props }: any) => {
  const isInternalLink = href && href.startsWith(LIVE_SITE_URL);

  if (isInternalLink) {
    const path = href.replace(LIVE_SITE_URL, "") || "/";

    return (
      <Link href={path} className="text-blue-600 underline hover:text-blue-800">
        click here
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
      {...props}
    >
      {children}
    </a>
  );
};

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      defaultOrigin={LIVE_SITE_URL}
      className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
      components={{
        a: CustomLink,
      }}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
