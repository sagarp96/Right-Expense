import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiGmail } from "react-icons/si";
import { useState } from "react";
import { supabase } from "@/lib/superbase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
export const Route = createFileRoute("/signup")({
  component: SignupForm,
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Useremail = formData.get("email");
    const Userpassword = formData.get("password");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: Useremail,
        password: Userpassword,
      });

      if (error) {
        console.log("error in Signup", error.message);
      } else {
        console.log("Signup Success");
        await navigate({ to: "/NewUserpage" });
        toast.success("Sign Up Successfull");
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
        redirectTo: `${window.location.origin}/NewUserpage`,
      },
    });
    if (error) {
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
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-sm text-balance">
          🚀 start your journey today!
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
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign-Up
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link className="underline underline-offset-4" to="/loginform">
            Sign in to your account
          </Link>
          {/* <a href="#" className="underline underline-offset-4">
                  Sign up
                </a> */}
        </div>
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
      {/* <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div> */}
    </form>
  );
}
