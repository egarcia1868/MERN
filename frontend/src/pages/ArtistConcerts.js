import { useLocation } from "react-router-dom";
import ConcertDetails from "../components/ConcertDetails";
import { useState } from "react";

const ArtistConcerts = () => {
  const [expandedYear, setExpandedYear] = useState(null); // Track the expanded year
  const [expandTracks, setExpandTracks] = useState(false);
  const [caratState, setCaratState] = useState({});
  const [expandAll, setExpandAll] = useState(false);

  const location = useLocation();
  const { artist: {artistName, concerts} } = location.state || {};

  const sortedConcerts = concerts.sort((a, b) => {
    const [dayA, monthA, yearA] = a.eventDate.split("-").map(Number);
    const [dayB, monthB, yearB] = b.eventDate.split("-").map(Number);

    // Create date objects (YYYY-MM-DD for correct comparison)
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB - dateA; // Sort descending (most recent first)
  });

  const sortedConcertYears = [];
  for (let i = 0; i < sortedConcerts.length; i++) {
    const year = sortedConcerts[i].eventDate.split("-").map(Number)[2];

    if (!sortedConcertYears.includes(year)) {
      sortedConcertYears.push(year);
    }
  }

  const getYearFromDate = (dateString) => {
    const [day, month, year] = dateString.split("-"); // Assuming DD-MM-YYYY format
    return new Date(`${year}-${month}-${day}`).getFullYear();
  };

  const toggleYear = (year) => {
    setCaratState((prevState) => ({
      ...prevState,
      [year]: !prevState[year],
    }));
    setExpandedYear(expandedYear === year ? null : year); // Toggle expansion
  };

  return (
    <>
      <h1>{artistName}</h1>
      <div className="concerts">
        <h2>Songs By # Of Times Seen <span style={{fontSize: '.5rem', cursor: 'pointer', color: '#1a0dab'}} onClick={() => setExpandTracks(prev => !prev)}>expand</span></h2>
        
        <h2>Concerts By Year <span style={{fontSize: '.5rem', cursor: 'pointer', color: '#1a0dab'}} onClick={() => setExpandAll(prev => !prev)}>expand all</span></h2>
        {sortedConcertYears ? (
          sortedConcertYears.map((year) => (
            <div key={year}>
              <h3
                style={{ cursor: "pointer", margin: "10px 0" }}
                onClick={() => toggleYear(year)} // Toggle the expanded year
              >
                {year} {(caratState[year] || expandAll) ? "▼" : "▲"}
              </h3>
              {(expandedYear === year || expandAll) && (
                <div>
                  {sortedConcerts
                    .filter(
                      (concert) => getYearFromDate(concert.eventDate) === year
                    )
                    .map((concert) => (
                      <ConcertDetails key={concert.id} concert={concert} />
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No concerts for this artist</p>
        )}
      </div>
    </>
  );
};

export default ArtistConcerts;
