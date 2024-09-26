import React from 'react';

const PDFViewer = () => {
  // console.log(process.env.PUBLIC_URL);
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src={`${process.env.PUBLIC_URL}/assets/almanac/B.Tech Almanac_M-2024_ UG2,3,4.pdf`}
        width="100%"
        height="100%"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;