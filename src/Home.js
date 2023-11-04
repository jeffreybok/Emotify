import React, { useRef, useEffect } from 'react';
import backgroundVideo from './video.mp4'; // Import your video file

function Home() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '12rem',
    color: '#21de65',
    fontFamily: 'Verdana',
    fontWeight: 'bolder',
    textShadow: '10px 5px 2px rgba(0, 0, 0, 0.8)',
    marginTop: '100px',
    zIndex: 1,
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '2rem',
    fontFamily: 'Rockwell',
    padding: '10px 50px',
    cursor: 'pointer',
    marginTop: '30px',
    boxShadow: '10px 5px 2px rgba(0, 0, 0, 0.05)',
    zIndex: 1,
  };

  const videoRef = useRef();

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'fill', // This maintains aspect ratio and covers the container
    zIndex: 0,
  };

  const facecamStyle = {
    position: 'absolute',
    top: '30%',
    left: '5%',
    width: '40%',
    height: 'auto',
    zIndex: 1,
    boxShadow: '7px 10px 10px rgba(0, 0, 0, 1)',
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '30%',
    right: '10%', // Adjust the right position
    zIndex: 1,
  };

  const textContentStyle = {
    fontSize: '2rem',
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: 'bolder',
    textShadow: '10px 5px 2px rgba(0, 0, 0, 0.8)',
  };
  

  const scrollToSection = (elementRef, offset = -50) => {
    if (elementRef && elementRef.current) {
      const targetPosition = elementRef.current.offsetTop - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();
  }, []);

  return (
    <div style={containerStyle}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={videoStyle}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <h1 style={titleStyle}>EMOTIFY</h1>
      <button
        style={buttonStyle}
        onClick={() => scrollToSection(videoRef, 50)} // Adjust the offset to control scrolling distance
      >
        Find your playlist
      </button>
      <div style={{ height: '100vh' }}>
      </div>
      <div id="facecam-container" style={{ background: 'none', padding: '20px', zIndex: 1 }}>
        <video ref={videoRef} autoPlay playsInline style={facecamStyle} />
      </div>
      <div style={textContainerStyle}>
        <div style={textContentStyle}>
          Your mood:
          <br />
          <br />
          *Insert mood and score here*
          <br />
          <br />
          <br />
          Playlist based on your mood:
          <br />
          <br />
          *insert playlist here*
        </div>
        <button
          style={buttonStyle}
          onClick={() => scrollToSection({ current: { offsetTop: document.body.scrollHeight } }, 0)}
        >
          See playlist
        </button>
      </div>
      <div style={{ height: '200vh' }}>
      </div>
    </div>
  );
}

export default Home;
