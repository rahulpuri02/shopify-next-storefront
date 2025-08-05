"use client";

import { FOOTER } from "@/constants/shared";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterForm() {
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showThanksMessage) return;
    setShowThanksMessage(true);
    setEmail("");
    setTimeout(() => {
      setShowThanksMessage(false);
    }, 2200);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 mb-11 md:mb-3">
      <div className="relative">
        {showThanksMessage && <p className="text-xs">{FOOTER.thanksForSubscribing}</p>}
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "mt-3 mb-4 w-full border-b border-white bg-transparent py-2 pt-1 pr-7 text-white placeholder-white outline-none",
            showThanksMessage && "pt-1"
          )}
          placeholder={FOOTER.emailPlaceholder}
        />
        {email.length > 0 && (
          <button
            type="submit"
            className="absolute top-[22px] right-0 cursor-pointer text-white md:top-[13px]"
          >
            <ArrowRight className="h-auto w-5 opacity-60" />
          </button>
        )}
      </div>
      <label className="flex items-center gap-2 text-xs leading-tight tracking-wider uppercase">
        <input type="checkbox" className="mt-[2px]" />
        {FOOTER.termsLabel}
      </label>
    </form>
  );
}
