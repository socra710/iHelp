export default function Footer() {
  return (
    <footer className="p-4">
      <div className="container mx-auto text-center text-gray-400" style={{ fontSize: '0.75rem' }}>
        <p>&copy; {new Date().getFullYear()} i-Help. All rights reserved.</p>
      </div>
    </footer>
  );
}
