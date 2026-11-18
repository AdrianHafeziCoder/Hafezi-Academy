// Form field connected to Formik: label + input + error message
// type: text / email / password / number / date / textarea / checkbox / select (with options)
export default function FormField({
  label,
  name,
  formik,
  type = "text",
  options,
}) {
  const error = formik.touched[name] && formik.errors[name];
  const common = {
    id: name,
    name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(error),
  };
  const value = formik.values[name] ?? "";

  let input;
  if (type === "checkbox") {
    input = (
      <input
        type="checkbox"
        {...common}
        checked={Boolean(value)}
        className="size-5 accent-primary"
      />
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        {...common}
        value={value}
        className="field h-24 rounded-2xl py-3"
      />
    );
  } else if (type === "file") {
    // A file is not stored with the regular handleChange,
    input = (
      <input
        type="file"
        id={name}
        name={name}
        onBlur={formik.handleBlur}
        onChange={(e) => formik.setFieldValue(name, e.currentTarget.files[0])}
        className="field pt-2"
      />
    );
  } else if (options) {
    input = (
      <select {...common} value={value} className="field">
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else {
    input = <input type={type} {...common} value={value} className="field" />;
  }

  return (
    <div
      className={
        type === "checkbox"
          ? "flex items-center gap-2"
          : "flex flex-col gap-1.5"
      }
    >
      <label
        htmlFor={name}
        className="text-body-sm font-medium text-foreground"
      >
        {label}
      </label>
      {input}
      {error && (
        <p className="text-caption text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
