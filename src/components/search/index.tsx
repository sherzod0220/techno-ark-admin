import { Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchProps {
  params: {
    search: string;
    page: number;
    limit: number;
  };
  setParams: (updater: (prevParams: any) => any) => void; // Correct type for setParams
}

const Index = (props: SearchProps) => {
  const { params, setParams } = props;
  const navigate = useNavigate();
  const location = useLocation(); // To get current query parameters

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;

    // Update the state with the new search value
    setParams((prev) => ({
      ...prev,
      search: newSearchValue,
    }));

    // Modify the query parameters in the URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", newSearchValue); // Set new search query param

    // Push the updated query parameters to the URL
    navigate(`?${searchParams.toString()}`);
  };

  return <Input placeholder="Search" value={params.search} onChange={handleChange} />;
};

export default Index;