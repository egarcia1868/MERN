import { useRef } from "react";

const UnderConstructionModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  if (isOpen && dialogRef.current) {
    dialogRef.current.showModal();
  }

  return (
    <dialog
      id="modal"
      ref={dialogRef}
      onClose={onClose}
      // className="construction-modal"
      // style={{ backgroundImage: 'url("/caution3.jpg")', backgroundSize: 'cover', filter: 'saturate(60%)'}}
    >
      <img style={{ display: 'block', margin: '0 auto'}} src="/construction.jpg" alt="Under Construction" />
      <h1 style={{ paddingTop: '2rem', textAlign: "center" }}>Site Currently Under Construction</h1>
      <h4 style={{ marginLeft: "1.5rem" }}>Planned improvements/bug fixes:</h4>
      <ul>
        <li>Add ability to select multiple dates on the show add form - (check commit from 4/16 for starting point)</li>
        <li>add ability to bring up selections of concerts by artist and year</li>
        <li>
          add ability to specific songs from set (for accurate tracking if arrived late/left early)
        </li>
        <li>
          create pie chart divided by number of times per song vs total.
        </li>
        <li>create login for tracking personal shows</li>
        <li>Set up db to be structured something like the following
        settrackr
          ├── users
          │   └──
          │         _id,
          │         username,
          |         password: (hashed),
          │         concertsAttended: [concertId1, concertId2, ...]
          │
          ├── artists
          │   └── 
          │         _id,
          │         artistName,
          │         mbid
          │
          ├── concerts
          │   └──
          │         _id,
          │         artistId,
          │         eventDate,
          │         venue,
          │         sets,
          │         url
        </li>
        <li>create personal page to display shows listed</li>
        <li>update login with OAuth</li>
        <li>create a song page that displays information about the specific song as well as when you've seen it</li>
        <li>
          add buttons to save new property that stores live/watched/listened. --
          add checkboxes to add modal.
        </li>
        <li>Find reliable api for artist images to display</li>
        <li>Update and optimize styling (general and for mobile)</li>
        <li>create separate links from main page to go to either artist's song list or concert lists.</li>
        
      </ul>
      <form method="dialog" id="modal-actions">
        <button style={{marginBottom:'2rem'}}>Close</button>
        {/* <button onClick={saveConcert}>Add show to my list!</button> */}
      </form>
    </dialog>
  );
  // }
};

export default UnderConstructionModal;
