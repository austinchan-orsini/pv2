type Props = {
  href: string;
  text: string;
  external?: boolean;
  className?: string;
};

export default function LinkWithIcon({ href, text, external, className = '' }: Props) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-ink-muted inline-flex items-center gap-1 ${className}`}
    >
      <span className="sweep sweep-mint">{text}</span>
    </a>
  );
}
