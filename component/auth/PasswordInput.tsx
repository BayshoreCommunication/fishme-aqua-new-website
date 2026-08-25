"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  placeholder: string;
  required?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}

const PasswordInput = ({
  id,
  name,
  autoComplete,
  placeholder,
  required = false,
  ariaInvalid = false,
  ariaDescribedBy,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <LockKeyhole
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
      />
      <input
        id={id}
        name={name}
        type={isVisible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className="h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.025] py-0 pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
      />
      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
      >
        {isVisible ? (
          <EyeOff aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Eye aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
