import { useState } from "react";
import { updateClockifyHours } from "../api/api";

type Member = {
  name: string;
  project: string;
  correctCohort: string;
};

export default function ClockifyUpdate() {
  const [clockifyForm, setClockifyForm] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [wrongCohort, setWrongCohort] = useState([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setClockifyForm(file);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (clockifyForm) {
      formData.append("file", clockifyForm);
      const res = await updateClockifyHours(formData);

      setLoading(false);
      setResponse(res.Message);
      setWrongCohort(res.wrongCohort);
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
      <label htmlFor="file">CSV File</label>
      <input type="file" name="file" onChange={onChange} required />
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
      {wrongCohort.length
        ? wrongCohort.map((member: Member, idx: number) => (
            <p
              key={idx}
            >{`${member.name} is in the wrong cohort. Their cohort: ${member.correctCohort}. The one they entered on clockify: ${member.project}`}</p>
          ))
        : null}
    </form>
  );
}
