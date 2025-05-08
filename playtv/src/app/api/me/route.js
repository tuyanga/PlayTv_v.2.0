// pages/api/me.js
export default function handler(req, res) {
    const { email } = req.query;
  
    // Simulate a database lookup
    if (email === 'test@example.com') {
      res.status(200).json({
        name: 'Uyanga',
        id: '000000',
        email: 'test@example.com',
        username: 'PlayTv',
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
  