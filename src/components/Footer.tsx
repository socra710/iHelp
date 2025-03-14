export default function Footer() {
  return (
    <footer className="bg-white-800 text-black p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} iHelp App. All rights reserved.</p>
      </div>
    </footer>
  );
}
