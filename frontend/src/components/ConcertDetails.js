import { useState } from "react";
import { useConcertsContext } from "../hooks/useConcertsContext";
import { BASE_URL } from "../utils/config";

const ConcertDetails = ({ concert, artistObjectId, onDelete }) => {
  const { dispatch } = useConcertsContext();
  const [showSetList, setShowSetList] = useState(false);

  const {
    concertId,
    eventDate,
    venue: {
      name: venueName,
      city: {
        name: cityName,
        state,
        country: { name: countryName },
      },
    },
    url,
    sets
  } = concert;
  const inputDate = eventDate;
  const [day, month, year] = inputDate.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}T00:00:00`);

  const outputDate = formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const deleteConcert = async (artistObjectId, concertId) => {
    console.log("Deleting concert for artist:", artistObjectId, "Concert ID:", concertId); // Debugging

    const response = await fetch(`${BASE_URL}/api/concerts/${artistObjectId}/${concertId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      console.error("Failed to delete concert");
      return;
    }
    if (onDelete) onDelete(concertId);
    dispatch({ type: "DELETE_CONCERT", payload: json });
  };  

  return (
    <div className="concert-details">
      <p>
        <strong>{venueName}</strong>
      </p>
      <p>
        {cityName}, {state}, {countryName}
      </p>
      <p>{outputDate}</p>
      <p onClick={() => setShowSetList(prev => !prev)}>setlist {showSetList ? '▼' : '▲'}</p>
      {showSetList && (
        sets ? sets.map((set, index) => (
          <div key={index}>
            <p>
              <strong>{set.name}</strong>
              <strong>
                {set.encore && "Encore"} {set.encore > 1 && set.encore}
              </strong>
            </p>
            <ol>
              {set.song.map((song, i) => (
                <li key={i}>{song.name}</li>
              ))}
            </ol>
          </div>
        )) : <p>Setlist unavailable</p>
      )}
      <div className="concert-details-links">
      <a style={{fontSize: '.65rem'}}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Info
      </a>
      <p
        style={{fontSize: '.65rem', color: 'red'}}
        onClick={() => deleteConcert(artistObjectId, concertId)}
      >
        Remove Concert
      </p>
      </div>
    </div>
  );
};

export default ConcertDetails;
