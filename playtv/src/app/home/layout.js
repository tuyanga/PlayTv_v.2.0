export default function Layout({ children }) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <main>{children}</main>
        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>&copy; 2025 PlayTV. All rights reserved.</p>
        </footer>
      </div>
    );
  }