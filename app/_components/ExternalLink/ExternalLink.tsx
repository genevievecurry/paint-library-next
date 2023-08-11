"use client";

import styles from "./ExternalLink.module.css";

export type ExternalLinkProps = {
  url?: string | null | undefined;
  children?: React.ReactNode;
};

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  url,
  children,
}) => {
  if (!url) return <></>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`decorate-link ${styles["external-link"]}`}
      data-umami-event="ExternalLinkClick"
      data-umami-event-external-url={url}
    >
      {children}
    </a>
  );
};
