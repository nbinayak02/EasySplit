import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import useSignupForm from "../hooks/useSignupForm";
import SubmitButton from "@/components/form/Submit-Button";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { control, onSubmitForm, handleSubmit, isPending } = useSignupForm();
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Signup to EasySplit</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your details below to signup.
          </p>
        </div>

        <FieldGroup className="flex flex-row justify-between">
          <Controller
            name="first_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  First Name
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="John"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Last Name
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Email
                <span className="text-rose-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="john@email.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>
                  Password
                  <span className="text-rose-500">*</span>
                </FieldLabel>
              </div>

              <Input
                {...field}
                type="password"
                id={field.name}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirm_password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
                  <span className="text-rose-500">*</span>
                </FieldLabel>
              </div>

              <Input
                {...field}
                type="password"
                id={field.name}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <SubmitButton
            isPending={isPending}
            label="Signup"
            labelWhenPending="Signing you up"
          />
        </Field>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login here
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
