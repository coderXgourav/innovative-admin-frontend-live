import { Fragment } from "react";

const Watermark = () => {
  const watermark = process.env.REACT_APP_WATERMARK;
  // alert(watermark)
  return (
    <Fragment>
      <div
       className="View_file_template_pdf_watermark"
      >
        {watermark}
      </div>
    </Fragment>
  );
};

export default Watermark;