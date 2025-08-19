import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/superbase";
import toast, { Toaster } from "react-hot-toast";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiGmail } from "react-icons/si";
import { useAuth } from "@/hooks/useAuth";
import { CheckNewUser } from "@/hooks/Querry_Data";

export const Route = createFileRoute("/loginform")({
  component: LoginForm,
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { user, loading } = useAuth();
  const { data: CheckNewuser } = CheckNewUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [redirectPage, setredirectPage] = useState("");
  // useEffect(() => {
  //   const redirectPage = () => {
  //     console.log(CheckNewuser?.length, "New-UserCheck");
  //     if (CheckNewuser?.length) {
  //       return setredirectPage("BudgetDashboard");
  //     } else {
  //       return setredirectPage("NewUserpage");
  //     }
  //   };
  //   redirectPage();
  // }, [CheckNewuser?.length]);

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Useremail = formData.get("email");
    const Userpassword = formData.get("password");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: Useremail,
        password: Userpassword,
      });

      if (error) {
        toast.error(error.message);
      } else {
        console.log("SignIn Success");
        toast.success("Welcome Back!");
        navigate({ to: "/BudgetDashboard" });
      }
    } catch (error) {
      console.log("expected error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGmailSignup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/CheckUser`,
      },
    });
    if (error) {
      toast.error("No User Found");
      console.log(error, "Error in Gmail-Login");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSignup}
    >
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGmailSignup}
        >
          <SiGmail />
          Gmail
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline underline-offset-4" to="/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
}
