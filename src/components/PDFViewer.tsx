interface PDFViewerProps {
  base64Data: string; // Base64 encoded PDF data
}

const PDFViewer = ({ base64Data }: PDFViewerProps) => {
  const pdfDataUri = `data:application/pdf;base64,${base64Data}`;
  window.print();
  return (
    <iframe
      title="PDF Viewer"
      src={pdfDataUri}
      width="100%"
      height="100%"
      style={{ border: "none" }}
    />
  );
};

export default PDFViewer;
