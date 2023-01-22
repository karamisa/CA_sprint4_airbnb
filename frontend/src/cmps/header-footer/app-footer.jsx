export function AppFooter({ className, ...props }) {
  return (
    <footer {...props} className={`app-footer ${className}`}>
      <p>ake-bnb &copy; 2023</p>
    </footer>
  );
}
