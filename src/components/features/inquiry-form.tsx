"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { CommonDictionary } from "@/i18n/common";
import { EMAIL } from "@/lib/constants";
import type { FormState } from "@/types";

type Errors = Record<string, string>;

export function InquiryForm({ copy }: { copy: CommonDictionary["forms"] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<FormState>("idle");
  const endpoint = process.env.NEXT_PUBLIC_WEDDING_FORM_ENDPOINT;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    ["name", "email", "phone", "eventDate", "eventType", "partySize", "location"].forEach((key) => {
      if (!String(data.get(key) ?? "").trim()) next[key] = copy.required;
    });
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = copy.invalidEmail;
    return next;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setState("error"); form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus(); return; }
    if (!endpoint) { setState("error"); return; }
    setState("submitting");
    try {
      const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Delivery failed");
      form.reset(); setErrors({}); setState("success");
    } catch { setState("error"); }
  }

  const error = (name: string) => errors[name] ? <p id={`${name}-error`} className="field-error">{errors[name]}</p> : null;
  const describedBy = (name: string) => errors[name] ? `${name}-error` : undefined;
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <div className="field"><label className="label" htmlFor="name">{copy.name}</label><input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />{error("name")}</div>
      <div className="field"><label className="label" htmlFor="email">{copy.email}</label><input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />{error("email")}</div>
      <div className="field"><label className="label" htmlFor="phone">{copy.phone}</label><input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />{error("phone")}</div>
      <div className="field"><label className="label" htmlFor="eventDate">{copy.eventDate}</label><input id="eventDate" name="eventDate" type="date" aria-invalid={Boolean(errors.eventDate)} aria-describedby={describedBy("eventDate")} />{error("eventDate")}</div>
      <div className="field"><label className="label" htmlFor="eventType">{copy.eventType}</label><select id="eventType" name="eventType" defaultValue="" aria-invalid={Boolean(errors.eventType)} aria-describedby={describedBy("eventType")}><option value="" disabled>{copy.selectOne}</option><option value="bride">{copy.bride}</option><option value="bridesmaid">{copy.bridesmaid}</option><option value="debutante">{copy.debutante}</option><option value="other">{copy.other}</option></select>{error("eventType")}</div>
      <div className="field"><label className="label" htmlFor="partySize">{copy.partySize}</label><input id="partySize" name="partySize" type="number" min="1" inputMode="numeric" aria-invalid={Boolean(errors.partySize)} aria-describedby={describedBy("partySize")} />{error("partySize")}</div>
      <div className="field"><label className="label" htmlFor="location">{copy.location}</label><select id="location" name="location" defaultValue="" aria-invalid={Boolean(errors.location)} aria-describedby={describedBy("location")}><option value="" disabled>{copy.selectOne}</option><option value="studio">{copy.studio}</option><option value="on-site">{copy.onSite}</option></select>{error("location")}</div>
      <div className="field inquiry-form__message"><label className="label" htmlFor="message">{copy.message}</label><textarea id="message" name="message" /></div>
      <input className="visually-hidden" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="inquiry-form__submit"><Button type="submit" disabled={state === "submitting"}>{state === "submitting" ? copy.sending : copy.send}</Button></div>
      <div className="inquiry-form__status" role="status" aria-live="polite">
        {state === "success" ? <p className="status-message">{copy.success}</p> : null}
        {state === "error" && !Object.keys(errors).length ? <p className="status-message">{copy.disconnected} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p> : null}
      </div>
    </form>
  );
}
