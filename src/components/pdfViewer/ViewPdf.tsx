import usePDFViewer from '../../lib/hooks/usePdf'
import { PdfDocument } from '../../lib/types/document.type'
import { PDFOptionsBar } from './OptionsBar'
import MemoizedVirtualizedPDF from './VirtualizedPdf'

interface ViewPdfProps {
  file: PdfDocument
}

export const ViewPdf: React.FC<ViewPdfProps> = ({ file }) => {
  const {
    scrolledIndex,
    setCurrentPageNumber,
    scale,
    setScaleFit,
    numPages,
    setNumPages,
    handleZoomIn,
    handleZoomOut,
    nextPage,
    prevPage,
    scaleText,
    pdfFocusRef,
    goToPage,
    setZoomLevel,
    zoomInEnabled,
    zoomOutEnabled,
  } = usePDFViewer(file)

  return (
    <div className="relative">
      {scaleText && (
        <PDFOptionsBar
          file={file}
          scrolledIndex={scrolledIndex}
          numPages={numPages}
          scaleText={scaleText}
          nextPage={nextPage}
          prevPage={prevPage}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          goToPage={goToPage}
          setZoomLevel={setZoomLevel}
          zoomInEnabled={zoomInEnabled}
          zoomOutEnabled={zoomOutEnabled}
        />
      )}

      <MemoizedVirtualizedPDF
        key={`${file.id}`}
        ref={pdfFocusRef}
        file={file}
        setIndex={setCurrentPageNumber}
        scale={scale}
        setScaleFit={setScaleFit}
        setNumPages={setNumPages}
      />
    </div>
  )
}
