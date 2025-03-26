import { useState } from "react";

const ConcertDetails = ({ concert }) => {
  // const [caratState, setCaratState] = useState(true);
  const [showSetList, setShowSetList] = useState(false);

  const {
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

  // const showSetList = () => {

  // }

  return (
    <div className="concert-details">
      <p>
        <strong>{venueName}</strong>
      </p>
      <p>
        {cityName}, {state}, {countryName}
      </p>
      <p>{outputDate}</p>
      <p onClick={() => setShowSetList(!showSetList)}>setlist {showSetList ? '▼' : '▲'}</p>
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
      <br />
      <a style={{fontSize: '.65rem'}}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Info
      </a>
    </div>
  );
};

export default ConcertDetails;
