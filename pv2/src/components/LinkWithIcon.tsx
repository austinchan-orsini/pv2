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
      className={`text-subtext1 hover:text-accent inline-flex items-center gap-1 transition-colors duration-200 ${className}`}
    >
      {text}
    </a>
  );
}
