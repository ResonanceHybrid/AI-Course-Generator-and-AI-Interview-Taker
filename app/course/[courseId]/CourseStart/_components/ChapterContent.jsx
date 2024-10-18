import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  // Determine if content is an array or has a chapters property
  const chapters = Array.isArray(content?.content) 
    ? content.content 
    : content?.content?.chapters;

  return (
    <div className='p-10'>
      {/* Display Chapter Name */}
      <h2 className='font-medium text-2xl'>{chapter?.chapter_name}</h2>
      <p>{chapter?.about}</p>

      {/* YouTube Video */}
      <div className='flex justify-center my-6'>
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* Map through chapters content */}
      <div>
        {chapters?.map((item, index) => (
          <div key={index} className='p-5 bg-slate-50 mb-3 rounded-lg'>
            <h2 className='font-medium text-lg'>{item?.title}</h2>
            <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            {item?.code && (
              <div className='p-4 bg-black text-white rounded-md mt-3'>
                <pre>
                  <code>{item?.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default ChapterContent;