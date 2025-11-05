import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 para redirigir
import Button from "../Button/Button";

export interface FormProps {
  labels: string[];
  txtForBtn: string;
  urlAction: string;
  method: "POST" | "PUT" | "EDIT" | "DELETE";
  id?: string;
  redirectOnSuccess?: string;
}

const Form = ({ labels, txtForBtn, urlAction, method, id, redirectOnSuccess }: FormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const data: Record<string, any> = { stock: true };

    labels.forEach((field) => {
      const input = form.elements.namedItem(field) as HTMLInputElement;
      data[field] = input.value;
    });

    try {
      const fullUrl = id ? `${urlAction}/${id}` : urlAction;
      const response = await fetch(fullUrl, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) setError(result.error || "Request failed");
      else {
        if (redirectOnSuccess) {
          navigate(redirectOnSuccess);
          return;
        }

        setSuccess("Form submitted successfully!");
        form.reset();
      }
    } catch {
      setError("Internal server error");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleForm}>
        {labels.map((field) => (
          <div key={field} className="mb-3">
            <label htmlFor={field} className="form-label">{field}</label>
            <input
              type={field === "price" ? "number" : field}
              name={field}
              id={field}
              className="form-control"
            />
          </div>
        ))}

        <Button label={txtForBtn} variant="warning" type="submit" />
      </form>
    </div>
  );
};

export default Form;
