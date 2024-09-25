import React from 'react';

const PDFViewer = () => {
  // console.log(process.env.PUBLIC_URL);
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src={`${process.env.PUBLIC_URL}/assets/timetable/Timetable M 2024 - Timetable M 2024 UG1234.pdf`}
        width="100%"
        height="100%"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;