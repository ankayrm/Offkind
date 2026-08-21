"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import type { Gender } from "@/lib/gender";
import type { Size } from "@/types";
import { mysterySizesByGender } from "@/data/mystery";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { ButtonLink } from "@/components/ui/Button";
import { ViberIcon } from "@/components/ui/ViberIcon";
import { ViberLink } from "@/components/ui/ViberLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn, formatCustomOrderWhatsApp, whatsappUrl } from "@/lib/utils";

const MAX_BYTES = 8 * 1024 * 1024;
const MIN_DETAILS = 24;
const MAX_DETAILS = 2000;

interface CustomOrderFormProps {
  gender: Gender;
}

function isImageFile(file: File) {
  return (
    file.type.startsWith("image/") ||
    /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)
  );
}

async function shareCustomRequest(file: File, text: string) {
  if (typeof navigator === "undefined" || !navigator.share) return false;
  const payload: ShareData = {
    files: [file],
    text,
    title: "OFFKIND Custom Order",
  };
  if (!navigator.canShare?.(payload)) return false;
  try {
    await navigator.share(payload);
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return true;
    return false;
  }
}

export function CustomOrderForm({ gender }: CustomOrderFormProps) {
  const inputId = useId();
  const detailsId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [size, setSize] = useState<Size | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [fileError, setFileError] = useState("");

  const sizes = mysterySizesByGender[gender];
  const detailsOk = details.trim().length >= MIN_DETAILS;
  const photoError = showErrors && !file;
  const detailsError = showErrors && !detailsOk;
  const message = formatCustomOrderWhatsApp({
    gender,
    details,
    size,
    photoName: file?.name,
  });

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const acceptFile = (next: File | undefined) => {
    if (!next) return;
    if (!isImageFile(next)) {
      setFileError("Use a photo (JPG, PNG, WEBP, or similar).");
      return;
    }
    if (next.size > MAX_BYTES) {
      setFileError("Keep the photo under 8 MB.");
      return;
    }
    setFileError("");
    setFile(next);
  };

  const validate = () => {
    const ok = Boolean(file) && detailsOk;
    setShowErrors(!ok);
    return ok;
  };

  const sendWhatsApp = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    if (!file || !navigator.canShare?.({ files: [file] })) return;
    event.preventDefault();
    const shared = await shareCustomRequest(file, message);
    if (!shared) window.location.assign(whatsappUrl(message));
  };

  return (
    <div className="ring-1 ring-inset ring-ok-line">
      <div className="border-b border-ok-line bg-ok-cream/50 px-5 py-4 md:px-6">
        <p className="kicker">Your request</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
          Photo + specifics
        </h2>
        <p className="mt-1 text-sm text-ok-muted">
          Drop the look. Write what matters. Then send it in chat and attach
          the same photo there.
        </p>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-2 md:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ok-muted">
            Picture
          </p>
          <input
            ref={fileRef}
            id={inputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => acceptFile(e.target.files?.[0])}
          />
          {preview ? (
            <div className="relative mt-3 overflow-hidden bg-ok-cream">
              {/* blob preview — not a remote asset */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Your custom order reference"
                className="aspect-[3/4] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-ok-black text-ok-off"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
              <p className="absolute bottom-0 inset-x-0 truncate bg-ok-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ok-off">
                {file?.name}
              </p>
            </div>
          ) : (
            <label
              htmlFor={inputId}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                acceptFile(e.dataTransfer.files[0]);
              }}
              className={cn(
                "mt-3 flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-3 bg-white px-6 text-center ring-1 ring-inset transition-colors",
                dragging || photoError
                  ? photoError
                    ? "ring-red-600"
                    : "bg-ok-yellow/30 ring-ok-black"
                  : "ring-ok-line hover:bg-ok-yellow/20 hover:ring-ok-black"
              )}
            >
              <ImagePlus className="h-8 w-8" strokeWidth={1.4} />
              <span className="font-display text-xl font-bold tracking-tight">
                Drop a photo
              </span>
              <span className="text-sm text-ok-muted">
                Or tap to upload. Screenshot, street pic, product shot — all
                fine.
              </span>
            </label>
          )}
          {(fileError || photoError) && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {fileError || "Add a picture of what you want."}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor={detailsId}
            className="text-xs uppercase tracking-[0.18em] text-ok-muted"
          >
            What you want
          </label>
          <textarea
            id={detailsId}
            value={details}
            onChange={(e) => setDetails(e.target.value.slice(0, MAX_DETAILS))}
            rows={8}
            placeholder="Color, fabric, logos, fit, anything you care about. The more specific, the closer we can get."
            className={cn(
              "mt-3 min-h-[180px] w-full resize-y bg-white px-4 py-3 text-[15px] leading-relaxed outline-none ring-1 ring-inset transition-shadow",
              detailsError
                ? "ring-red-600"
                : "ring-ok-line focus:ring-ok-black"
            )}
          />
          <div className="mt-2 flex items-start justify-between gap-3">
            {detailsError ? (
              <p className="text-sm text-red-600" role="alert">
                Write a bit more so we know what to make.
              </p>
            ) : (
              <p className="text-sm text-ok-muted">
                A paragraph is enough. Include size notes if they matter.
              </p>
            )}
            <span className="shrink-0 font-mono text-[11px] text-ok-muted">
              {details.trim().length}/{MAX_DETAILS}
            </span>
          </div>

          <div className="mt-6">
            <SizeSelector
              sizes={sizes}
              value={size}
              onChange={setSize}
              label="Size (optional)"
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ok-muted">
            WhatsApp and Viber cannot pull the photo off this page. After the
            chat opens, attach the same picture you uploaded here. The
            paragraph is already in the message.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl(message)}
              variant="yellow"
              className="w-full sm:w-auto"
              onClick={(event) => void sendWhatsApp(event)}
            >
              <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
            </ButtonLink>
            <ViberLink
              items={[]}
              extraMessage={message}
              requireCheckout={false}
              variant="outline"
              className="w-full sm:w-auto"
              onClick={(event) => {
                if (!validate()) event.preventDefault();
              }}
            >
              <ViberIcon className="h-4 w-4" /> Send on Viber
            </ViberLink>
          </div>
        </div>
      </div>
    </div>
  );
}
