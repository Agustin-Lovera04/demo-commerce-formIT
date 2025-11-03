import { useState } from "react";
import Button from "../Button/Button";

interface FormProps {
  labels: string[];
  txtForBtn: string;
  urlAction: string;
  method: "POST" | "PUT" | "EDIT" | "DELETE";
  id?: string
}

const Form = ({ labels, txtForBtn, urlAction, method, id }: FormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    try {
      const fullUrl = id ? `${urlAction}/${id}` : urlAction;
      
      const response = await fetch(fullUrl, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Request failed");
      } else {
        setSuccess("Form submitted successfully!");
        e.currentTarget.reset();
      }
    } catch (err) {
      setError("Internal server error");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleForm}>
        {labels.map((field) => {
          let inputElement;
          if (field == 'price') {
            inputElement = <input type="number" name={field} id={field}  className="form-control"/>;
          } else if (field == 'stock') {
            inputElement = <input type="checkbox" name={field} id={field}  className="form-control"/>;
          } else {
            inputElement = <input type={field} name={field} id={field}  className="form-control"/>;
          }
          return (
            <div key={field}>
              <label htmlFor={field} className="form-label">{field}</label>
              {inputElement}
            </div>
          );
        })}

        <Button label={txtForBtn} variant="warning"/>
      </form>
    </div>
  );
};

export default Form;
