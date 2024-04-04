export default function Layout({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-sm w-full">{children}</div>
    </div>
  );
}
