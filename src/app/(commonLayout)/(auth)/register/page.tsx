import RegisterForm from "@/components/register-form";
import Logo from "@/components/shared/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="w-full max-w-xl">
          <Card className="p-2">
            <CardHeader>
              <Logo />
              <CardTitle className="text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
