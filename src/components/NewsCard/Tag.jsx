import React from "react";

export default function Tag({ text }) {
  return (
    <span className="px-3 py-1 text-xs font-medium bg-surface text-text-muted rounded-full border border-border-subtle">
      #{text}
    </span>
  );
}
