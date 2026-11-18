import { useFormik } from "formik";
import { toast } from "sonner";
import Modal from "./Modal";
import Button from "./Button";
import FormField from "./FormField";
import { errorText } from "../../lib/apiData";

// Ready-made form inside a modal: just pass fields, schema and onSubmit
// fields = [{ name, label, type, options }]
export default function FormModal({
  title,
  fields,
  initialValues,
  schema,
  onSubmit,
  onClose,
  submitText = "Save",
  successText = "Saved",
}) {
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      try {
        await onSubmit(values);
        toast.success(successText);
        onClose();
      } catch (err) {
        toast.error(errorText(err));
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Modal title={title} onClose={onClose}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4"
        noValidate
      >
        {fields.map((f) => (
          <FormField key={f.name} formik={formik} {...f} />
        ))}
        <div className="mt-2 flex justify-end gap-2">
          <Button look="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Sending…" : submitText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
