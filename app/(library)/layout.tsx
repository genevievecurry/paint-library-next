export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lg:container mx-auto px-4 sm:px-6">{children}</div>;
}
