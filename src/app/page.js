"use client";
import { useEffect, useState } from 'react';
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [index, setIndex] = useState(0);
  const [after, setAfter] = useState('');

  useEffect(() => {
    fetchData();
  }, [after]);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://www.reddit.com/r/memes.json?after=${after}`);
      const data = await res.json();

      if (data && data.data && data.data.children) {
        // Remove duplicates based on unique ID
        const newPosts = data.data.children.filter(post => !memes.some(existingPost => existingPost.data.id === post.data.id));

        setMemes(prevMemes => [...prevMemes, ...newPosts]);
        setAfter(data.data.after);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  const handleScroll = () => {
    const container = document.documentElement;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-5">Reddit Memes Gallery</h1>
      <Gallery>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-2 ml-2" onScroll={handleScroll}>
          {memes.map((meme, i) => (
            <Item
              key={meme.data.id}
              original={meme.data.url_overridden_by_dest}
              thumbnail={meme.data.url_overridden_by_dest}
              width="768"
              height="768"
            >
              {({ ref, open }) => (
                <div
                  key={meme.data.id}
                  className="p-4 rounded-md hover:shadow-md transition-transform hover:scale-105 cursor-pointer"
                  style={{ position: 'relative', overflow: 'hidden' }} // Add custom styles here
                  onClick={() => {
                    setIndex(i);
                    open();
                  }}
                >
                  <img
                    src={meme.data.url_overridden_by_dest}
                    alt={`Meme ${i}`}
                    ref={ref}
                    className="w-full h-auto rounded-md mb-2"
                  />
                  <p className="text-sm font-medium">{meme.data.title}</p>
                  <p className="text-xs text-gray-500">By {meme.data.author}</p>
                </div>
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>

  );
};

export default Home;
