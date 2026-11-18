import { useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import Logo from "../../components/ui/Logo";

import { login } from "../../services/authApi";
import { saveLogin, isLoggedIn } from "../../services/authStorage";
import { errorText } from "../../lib/apiData";
import { ADMIN_BASE } from "../../config/settings";

// Validation
const schema = yup.object({
  phoneOrGmail: yup.string().required("Enter your email or mobile number"),
  password: yup.string().required("Enter your password"),
});

const fields = [
  { name: "phoneOrGmail", label: "Email or mobile number" },
  { name: "password", label: "Password", type: "password" },
];

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneOrGmail: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await login({ ...values, rememberMe: true });
        const roles = res.data.roles ?? [];

        // Only admins can enter the panel
        if (!roles.includes("admin") && !roles.includes("superadmin")) {
          toast.error("This account does not have access to the admin panel");
          return;
        }

        saveLogin(res.data);
        navigate(ADMIN_BASE);
      } catch (err) {
        toast.error(errorText(err));
      }
    },
  });

  if (isLoggedIn()) {
    return <Navigate to={ADMIN_BASE} replace />;
  }

  return (
    <div
      dir="ltr"
      className="flex min-h-screen items-center justify-center gap-6 bg-background p-6 text-foreground lg:gap-8"
    >
      <Toaster richColors position="top-center" dir="ltr" />

      {/* Login Form */}
      <main dir="ltr" className="flex items-stretch justify-center">
        {" "}
        <div className="w-full max-w-md lg:rounded-3xl lg:border lg:border-border lg:bg-card lg:p-10 lg:shadow-hafezi-card">
          {" "}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6"
            noValidate
          >
            <div className="flex justify-center lg:justify-start">
              <Logo size={48} />
            </div>

            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-semibold text-primary">
                HAFEZI ACADEMY
              </span>

              <h1 className="text-h1-sm font-bold text-foreground">
                Sign in to the admin panel
              </h1>

              <p className="text-body-sm leading-7 text-muted-foreground">
                Sign in to your account to manage the different sections of the academy.
              </p>
            </div>

            <div className="space-y-5">
              {fields.map((field) => (
                <FormField key={field.name} formik={formik} {...field} />
              ))}
            </div>

            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-12 w-full"
            >
              {formik.isSubmitting ? "Signing in…" : "Sign in"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Exclusive access for Hafezi Academy administrators
            </p>

            {/* TODO: two-step login with Telegram code */}
          </form>
        </div>
      </main>

      {/* Desktop Visual Panel */}
      <aside
        dir="ltr"
        className="relative hidden w-[500px] flex-col justify-between self-stretch overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-brand-700 to-secondary p-12 text-white lg:flex"
      >
        {" "}
        {/* Decorative Shapes */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        {/* Top */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest text-white/80">
            HAFEZI ACADEMY
          </span>

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
            Admin Panel
          </span>
        </div>
        {/* Center Content */}
        <div className="relative z-10 max-w-xl space-y-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 font-heading text-5xl font-bold shadow-2xl backdrop-blur-xl">
            H
          </div>

          <div className="space-y-5">
            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
              Smart management,
              <br />
              more organized education.
            </h2>

            <p className="max-w-md text-base leading-7 text-white/75">
              Manage every part of the academy in one unified place, from terms and
              courses to users and reports.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-3">
            {["Course management", "User management", "Reports"].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-4 text-center text-xs text-white/90 backdrop-blur-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-white/60">
          <span>HAFEZI ACADEMY</span>
          <span>Unified academy management</span>
        </div>
      </aside>
    </div>
  );
}
