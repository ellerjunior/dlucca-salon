"use client";

import { useId, useState, type FormEvent } from "react";
import type { CommonDictionary } from "@/i18n/common";
import type { FormState } from "@/types";

export function NewsletterForm({ copy }: { copy: CommonDictionary["newsletter"] }) {
  const [state, setState] = useState<FormState>("idle");
  const emailId = useId();
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!endpoint) {
      setState("error");
      return;
    }
    setState("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <form className="newsletter-form" onSubmit={submit} noValidate>
        <div>
          <label htmlFor={emailId} className="visually-hidden">{copy.email}</label>
          <input id={emailId} name="email" type="email" autoComplete="email" placeholder={copy.email} required />
          <input className="visually-hidden" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </div>
        <button className="label" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? copy.sending : copy.signup}
        </button>
      </form>
      <p className="label" role="status" aria-live="polite">
        {state === "success" ? copy.success : null}
        {state === "error" ? copy.disconnected : null}
      </p>
    </div>
  );
}
