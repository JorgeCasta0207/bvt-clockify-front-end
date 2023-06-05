import { useState } from "react";
import { downloadCSV } from "../api/api";

type OptionObject = {
  project: string;
};

type GenerateCSVProps = {
  options: OptionObject[];
};

export default function GenerateCSV(props: GenerateCSVProps) {
  const [csvOption, setCsvOption] = useState("");
  const { options } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (csvOption.length && csvOption !== "default") {
      const res = await downloadCSV(csvOption);

      if (res) {
        const blob = new Blob([res.data], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${csvOption}.csv`;

        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setLoading(false);
      } else {
        onSubmit(event);
      }
    } else {
      console.log("No cohort selected");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <select
        name="csvoption"
        value={csvOption}
        onChange={(e) => setCsvOption(e.target.value)}
      >
        <option value="default">Select a cohort</option>
        {options
          ? options.map((option, idx: number) => (
              <option
                key={idx}
                value={option.project}
              >{`${option.project}`}</option>
            ))
          : null}
      </select>
      <button type="submit">Download CSV</button>
    </form>
  );
}
