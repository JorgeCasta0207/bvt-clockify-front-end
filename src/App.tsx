import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [formInfo, setFormInfo] = useState({
    file: null,
  });
  const [formInfoTwo, setFormInfoTwo] = useState({
    csvoption: "",
  });
  const [response, setResponse] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/getProjects");

      setOptions(res.data);
    };

    fetchData();
  }, []);

  const onChange = (e: any) => {
    const { name } = e.target;
    setFormInfo((prevFormData) => {
      return {
        ...prevFormData,
        [name]: e.target.files[0],
      };
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (formInfo.file) {
      formData.append("file", formInfo.file);
      try {
        const res = await axios.post(
          "http://localhost:3000/updateDatabase",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      setResponse("No file uploaded");
    }
  };

  const handleDownload = async (e: any) => {
    e.preventDefault();
    console.log(formInfoTwo);
    if (formInfoTwo.csvoption.length) {
      const res = await axios.post(
        "http://localhost:3000/downloadCSV",
        formInfoTwo,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([res.data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${formInfoTwo.csvoption}.csv`;

      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      console.log(res);
    } else {
      console.log("No cohort selected");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="file">CSV File</label>
        <input type="file" name="file" onChange={onChange} required />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleDownload}>
        <select
          name="csvoption"
          id="csvoption"
          value={formInfoTwo.csvoption}
          onChange={(e: any) => setFormInfoTwo({ csvoption: e.target.value })}
        >
          <option value="default">Select a cohort</option>
          {options
            ? options.map((option) => (
                <option value={option.project}>{`${option.project}`}</option>
              ))
            : null}
        </select>
        <button type="submit">Download CSV</button>
      </form>
    </div>
  );
}

export default App;
