export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { email, password } = body;

    // Example hardcoded user
    const user = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Uyanga',
    };

    if (email === user.email && password === user.password) {
      return new Response(
        JSON.stringify({
          message: 'Login successful',
          user: {
            name: user.name,
            email: user.email,
          },
          token: 'fake-jwt-token',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
