import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center text-4xl p-4">
      <h1>KOTOBA</h1>
      <LoginLink>Login</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </main>
  );
}
