export default function layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen max-w-full">
      {children}
    </div>
  )
}
