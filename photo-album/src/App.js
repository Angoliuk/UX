import React from 'react';
import './App.css';
import Header from './Header';
const photos = [{
    id : 1,
    src: "https://picsum.photos/seed/picsum/250/350"
  },
  {
    id : 2,
    src: "https://picsum.photos/250/350/?blur=3"
  },
  {
    id : 3,
    src: "https://picsum.photos/seed/picsum/250/350"
  },
  {
    id : 4,
    src: "https://picsum.photos/250/350?grayscale"
  },
  {
    id : 5,
    src: "https://picsum.photos/250/350/?blur=1.5"
  },
  {
    id : 6,
    src: "https://picsum.photos/id/870/250/350?grayscale&blur=2"
  },
  {id: 7,
    src: "https://picsum.photos/seed/picsum/250/350"
  }, {
    id: 8,
    src: "https://picsum.photos/250/350/?blur"
  }, {
    id: 9,
    src: "https://picsum.photos/seed/picsum/250/350"
  }, {
    id: 10,
    src: "https://picsum.photos/250/350?grayscale"
  }, {
    id: 11,
    src: "https://picsum.photos/250/350/?blur=2"
  }, {
    id: 12,
    src: "https://picsum.photos/id/870/250/350?grayscale&blur=2"
  },
];

function App() {
  return (
    <div>
      <Header /> 
      {photos.map(item => {
       return <img key={item.id} className="part-of-photo-list" src={item.src} id={item.id} />
      })}
    </div>
  );
}

export default App;