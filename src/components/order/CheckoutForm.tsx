"use client";

import { cn } from "@/lib/utils";
import {
  deliveryMethods,
  detailsLabel,
  detailsPlaceholder,
  isValidEmail,
  isValidPhone,
} from "@/data/checkout";
import type { CheckoutDetails, DeliveryMethod } from "@/types";
import { PhoneCountrySelect } from "@/components/order/PhoneCountrySelect";

interface CheckoutFormProps {
  value: CheckoutDetails;
  onChange: (next: CheckoutDetails) => void;
  showErrors?: boolean;
}

export function CheckoutForm({
  value,
  onChange,
  showErrors = false,
}: CheckoutFormProps) {
  const emailError = showErrors && !isValidEmail(value.email);
  const phoneError =
    showErrors && !isValidPhone(value.phone, value.phoneCountry);
  const cityError = showErrors && value.city.trim().length < 2;
  const detailsError = showErrors && value.details.trim().length < 4;
  const methodError = showErrors && !value.deliveryMethod;

  const setMethod = (deliveryMethod: DeliveryMethod) => {
    onChange({ ...value, deliveryMethod });
  };

  return (
    <section className="mt-10 ring-1 ring-inset ring-ok-line">
      <div className="border-b border-ok-line bg-ok-cream/50 px-5 py-4 md:px-6">
        <p className="kicker">Required</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
          Checkout
        </h2>
        <p className="mt-1 text-sm text-ok-muted">
          Contact details, location, and how you receive the order. Required to
          send.
        </p>
      </div>

      <div className="space-y-7 p-5 md:p-6">
        <fieldset>
          <legend className="text-xs uppercase tracking-[0.18em] text-ok-muted">
            Identification
          </legend>
          <p className="mt-2 text-sm leading-relaxed text-ok-muted">
            We ask for your email and phone number to identify your order and to
            verify that this request is genuine before we proceed.
          </p>

          <div className="mt-4 space-y-5">
            <div>
              <label
                htmlFor="checkout-email"
                className="text-xs uppercase tracking-[0.18em] text-ok-muted"
              >
                Email
              </label>
              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={value.email}
                onChange={(e) => onChange({ ...value, email: e.target.value })}
                placeholder="you@email.com"
                className={cn(
                  "mt-2 w-full bg-white px-4 py-3 text-[15px] outline-none ring-1 ring-inset transition-shadow",
                  emailError
                    ? "ring-red-600"
                    : "ring-ok-line focus:ring-ok-black"
                )}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  Add a valid email address.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="text-xs uppercase tracking-[0.18em] text-ok-muted"
              >
                Phone
              </label>
              <div
                className={cn(
                  "mt-2 flex items-stretch bg-white ring-1 ring-inset transition-shadow focus-within:ring-ok-black",
                  phoneError ? "ring-red-600" : "ring-ok-line"
                )}
              >
                <PhoneCountrySelect
                  value={value.phoneCountry}
                  onChange={(phoneCountry) =>
                    onChange({ ...value, phoneCountry })
                  }
                  invalid={phoneError}
                  embedded
                />
                <input
                  id="checkout-phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  value={value.phone}
                  onChange={(e) =>
                    onChange({ ...value, phone: e.target.value })
                  }
                  placeholder="699 491 9536"
                  className="min-w-0 flex-1 border-l border-ok-line bg-transparent px-4 py-3 text-[15px] outline-none"
                />
              </div>
              {phoneError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  Select your country and add a valid phone number.
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs uppercase tracking-[0.18em] text-ok-muted">
            How you receive it
          </legend>
          <div className="mt-3 grid gap-2">
            {deliveryMethods.map((method) => {
              const selected = value.deliveryMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setMethod(method.id)}
                  aria-pressed={selected}
                  className={cn(
                    "w-full px-4 py-3.5 text-left ring-1 ring-inset transition-colors",
                    selected
                      ? "bg-ok-black text-ok-off ring-ok-black"
                      : "bg-transparent text-ok-black ring-ok-line hover:ring-ok-black"
                  )}
                >
                  <span className="block text-sm font-medium">{method.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[12px] leading-relaxed",
                      selected ? "text-ok-off/65" : "text-ok-muted"
                    )}
                  >
                    {method.hint}
                  </span>
                </button>
              );
            })}
          </div>
          {methodError && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              Pick Cash on Delivery, Box Now, or Regular Delivery.
            </p>
          )}
        </fieldset>

        <div>
          <label
            htmlFor="checkout-city"
            className="text-xs uppercase tracking-[0.18em] text-ok-muted"
          >
            City / area
          </label>
          <input
            id="checkout-city"
            type="text"
            autoComplete="address-level2"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="Athens, Thessaloniki…"
            className={cn(
              "mt-2 w-full bg-white px-4 py-3 text-[15px] outline-none ring-1 ring-inset transition-shadow",
              cityError
                ? "ring-red-600"
                : "ring-ok-line focus:ring-ok-black"
            )}
          />
          {cityError && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              Add your city or area.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="checkout-details"
            className="text-xs uppercase tracking-[0.18em] text-ok-muted"
          >
            {detailsLabel(value.deliveryMethod)}
          </label>
          <textarea
            id="checkout-details"
            rows={3}
            autoComplete="street-address"
            value={value.details}
            onChange={(e) => onChange({ ...value, details: e.target.value })}
            placeholder={detailsPlaceholder(value.deliveryMethod)}
            className={cn(
              "mt-2 w-full resize-y bg-white px-4 py-3 text-[15px] outline-none ring-1 ring-inset transition-shadow",
              detailsError
                ? "ring-red-600"
                : "ring-ok-line focus:ring-ok-black"
            )}
          />
          {detailsError && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {value.deliveryMethod === "box-now"
                ? "Add the Box Now locker name or code."
                : "Add your street address."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
