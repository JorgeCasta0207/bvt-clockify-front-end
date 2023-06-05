import { useEffect, useState } from "react";
import MasterUpdate from "./MasterUpdate";
import ClockifyUpdate from "./ClockifyUpdate";
import GenerateCSV from "./GenerateCSV";
import { getProjects } from "../api/api";

function App() {
  const [options, setOptions] = useState([{ project: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();

      setOptions(res);
    };

    fetchData();
  }, []);

  return (
    <div>
      <MasterUpdate />
      <ClockifyUpdate />
      <GenerateCSV options={options} />
    </div>
  );
}

export default App;
