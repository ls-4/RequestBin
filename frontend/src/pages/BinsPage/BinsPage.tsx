import { Link } from "react-router-dom";
import { createBin } from "./services";
import { generateBinId } from "./utils";

const BinsPage = () => {
  const urlInput = generateBinId();




  return (
    <>
      <div>
        <h1>Bins</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const authToken = crypto.randomUUID();
              const response = await createBin(urlInput, authToken);
              localStorage.setItem(`basket_${urlInput}`, authToken);
              console.log(response);
            } catch (error) {
              alert("Failed to create a new bin.");
              console.error(error);
            }
          }}
        >
          
          <input
            type="text"
            value={urlInput}
            
          />
          <button type="submit">Create New Bin</button>
        </form>

        <Link to="/bins/123">Go to Bin 123</Link>
      </div>
    </>
  );
};

export default BinsPage;
