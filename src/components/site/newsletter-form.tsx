"use client";

import { useId, useState, type FormEvent } from "react";
import type { FormState } from "@/types";

export function NewsletterForm() {
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
          <label htmlFor={emailId} className="visually-hidden">Email address</label>
          <input id={emailId} name="email" type="email" autoComplete="email" placeholder="Email address" required />
          <input className="visually-hidden" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </div>
        <button className="label" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending" : "Sign up"}
        </button>
      </form>
      <p className="label" role="status" aria-live="polite">
        {state === "success" ? "You’re on the list." : null}
        {state === "error" ? "Signup delivery is not connected in this preview." : null}
      </p>
    </div>
  );
}
