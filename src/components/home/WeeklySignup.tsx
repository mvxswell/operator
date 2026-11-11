"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { HONEYPOT_FIELD, normalizeSubscriberEmail, subscribeEndpoint } from "@/lib/subscribe";

const emptySubscribe = () => () => {};

/**
 * The form is mounted only in the browser. Without JavaScript the server HTML
 * has no form (a noscript note sits beside this component), so a browser that
 * cannot POST never shows a control that goes nowhere.
 */
export function WeeklySignup() {
  const ready = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const emailId = useId();
  const companyId = useId();
  const statusId = useId();

  if (!ready) return null;

  if (status === "done") {
    return (
      <p className="hh-form-ok" role="status">
        You’re on the list. We’ll only email the brief. Unsubscribe by replying.
      </p>
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const address = normalizeSubscriberEmail(email);
    if (!address) {
      setStatus("error");
      setMessage("Enter an email address like you@company.com.");
      return;
    }
    const endpoint = subscribeEndpoint(process.env.NEXT_PUBLIC_PRESENCE_URL);
    if (!endpoint) {
      setStatus("error");
      setMessage("Signup isn’t available from this build.");
      return;
    }
    setStatus("sending");
    setMessage("");
    const body = new URLSearchParams({ email: address, [HONEYPOT_FIELD]: honeypot });
    void fetch(endpoint, { method: "POST", body, mode: "cors" })
      .then((response) => {
        if (response.status === 204) {
          setStatus("done");
          return;
        }
        setStatus("error");
        setMessage(response.status === 429 ? "Too many tries. Wait a minute and try again." : "That didn’t save. Check the address and try again.");
      })
      .catch(() => {
        setStatus("error");
        setMessage("That didn’t save. Check the connection and try again.");
      });
  };

  return (
    <form className="hh-signup-fields" onSubmit={onSubmit} noValidate>
      <label className="hh-field" htmlFor={emailId}>Email address</label>
      <div className="hh-email">
        <input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-describedby={status === "error" ? statusId : undefined}
          required
        />
        <button type="submit" className="hh-btn hh-btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get the weekly playbook"}
        </button>
      </div>
      <div className="hh-hp">
        <label htmlFor={companyId}>Company</label>
        <input
          id={companyId}
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>
      {status === "error" ? <p id={statusId} className="hh-form-err" role="alert">{message}</p> : null}
    </form>
  );
}
