import { Link } from "react-router-dom";
import { useState } from "react";
import { createBin } from "./services";
import { generateBinId } from "./utils";

const BINS_STORAGE_PREFIX = "basket_";

const BinsPage = () => {
  const [urlInput, setUrlInput] = useState<string>(generateBinId());

  const basketKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith(BINS_STORAGE_PREFIX)
  );

  return (
    <>
      <div>
        <h1>Bins</h1>
        <form
          onSubmit={async (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
              const authToken = crypto.randomUUID();
              await createBin(urlInput, authToken);
              localStorage.setItem(`${BINS_STORAGE_PREFIX}${urlInput}`, authToken);
              setUrlInput(generateBinId());
            } catch (error: unknown) {
              alert("Failed to create a new bin.");
              console.error(error);
            }
          }}
        >
          <input
            type="text"
            value={urlInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrlInput(e.target.value)
            }
          />
          <button type="submit">Create New Bin</button>
        </form>
          <h2>My Baskets</h2>
          <ul>
            {basketKeys.map((key) => {
              const binId = key.replace(BINS_STORAGE_PREFIX, "");
              return (
                <li key={key}>
                  <Link to={`/bins/${binId}`}>{binId}</Link>
                </li>
              );
            })}
          </ul>
      </div>
    </>
  );
};

export default BinsPage;
