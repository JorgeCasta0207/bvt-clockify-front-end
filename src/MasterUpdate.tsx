import { useState } from "react";
import { updateCohortMembers } from "../api/api";

export default function MasterUpdate() {
  const [masterForm, setMasterForm] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setMasterForm(file);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (masterForm) {
      formData.append("file", masterForm);
      const res = await updateCohortMembers(formData);

      setResponse(res.Message);
      setLoading(false);
    } else {
      console.log("No file uploaded");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="file">Member File</label>
      <input type="file" name="file" onChange={onChange} required />
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
    </form>
  );
}
