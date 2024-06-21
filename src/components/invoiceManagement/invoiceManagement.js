import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import "./invoiceManagement.css";
import {
  createInvoices,
  fetchInvoices,
  updateInvoices,
  deleteInvoices,
} from "../../api-calls/apicalls";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function InvoiceManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [detailsCnt, setDetailsCnt] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNo, setCompanyPhoneNo] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [billingAdd, setBillingAdd] = useState("");
  const [shippingAdd, setShippingAdd] = useState("");
  const [details, setDetails] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [tax, setTax] = useState("");
  const [update, setUpdate] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [dbDetails, setDbDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => emailjs.init("ptuqDG8Zl2iuDoPXR"), []);

  const handleGeneratePDF = async () => {
    // console.log("yesss")
    const input = document.getElementById("content");

    await html2canvas(input).then(async (canvas) => {
      // console.log("then")
      const imgData = canvas.toDataURL("image/png");
      let pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // var pdfData = pdf.output('datauristring');
      // let pdfSize = pdfData.length;

      // while (pdfSize > 25000) {

      //   const compression = 0.75; // Adjust compression level as needed
      //   pdf = new jsPDF({ unit: 'px', format: 'a4' });
      //   pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST', compression);
      //   pdfData = pdf.output('datauristring');
      //   pdfSize = pdfData.length;
      // }

      console.log(pdf);
      pdf.save(`Invoice-${receiverName}-${invoiceNo}`);
      handlePdfModalClose();
      update ? setUpdate(false) : setUpdate(true);
      // window.location.reload()
      // Save the compressed PDF
      // const compressedPdf = pdfData;
      // await handleSend(compressedPdf)
    });
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleCreateModalClose = () => {
    setShowCreate(false);
    window.location.reload();
  };

  const handlePdfModalClose = () => {
    setShowPdf(false);
  };

  const handleCreate = async () => {
    let addData = {
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      invoice_no: invoiceNo,
      invoice_date: date,
      shipping_address: shippingAdd,
      billing_address: billingAdd,
      tax: tax,
      details: details,
    };

    const createdData = await createInvoices(addData);

    // if (createdData) {
    //   alert("invoice created")
    //   setShowCreate(false)
    //   setShowPdf(true)
    // }

    if (
      createdData?.success == "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success == "no") {
      alert("system error try again leter");
    } else if (createdData?.success == "yes") {
      setShowCreate(false);
      setShowPdf(true);
      alert("file template created successfully");
      // window.location.reload();
    }
  };

  const handleUpdate = async () => {
    let updateData = {
      invoice_id: invoiceId,
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      invoice_no: invoiceNo,
      invoice_date: date,
      shipping_address: shippingAdd,
      billing_address: billingAdd,
      tax: tax,
      details: dbDetails.concat(details),
    };

    const updatedData = await updateInvoices(updateData);

    // if (updatedData) {
    //   alert("invoice updated")
    //   setDetails(dbDetails.concat(details))
    //   setShowCreate(false)
    //   setShowPdf(true)
    // }
    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      setDetails(dbDetails.concat(details));
      setShowCreate(false);
      setShowPdf(true);
      alert("invoice updated successfully");
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    let deleteData = {
      invoiceDocId: id,
    };

    const deletedData = await deleteInvoices(deleteData);
    if (
      deletedData?.success == "no" &&
      deletedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (deletedData?.success == "no") {
      alert("system error try again leter");
    } else if (deletedData?.success == "yes") {
      // let tempTemplates = templates
      // tempTemplates.forEach((temp, ind) => {
      //   if (temp?._id == id) {
      //     tempTemplates.splice(ind, 1)
      //   }
      // })
      // setTemplates([...tempTemplates])

      alert("invoice deleted successfully");
      window.location.reload();
    }
  };

  const handleSend = async (pdf) => {
    // console.log("pdf",typeof pdf)
    const serviceId = "service_5rcwcy8";
    const customerTemplateId = "template_fcwwhlj";
    try {
      await emailjs.send(serviceId, customerTemplateId, {
        Name: receiverName,
        Email: receiverEmail,
        // File:pdf
      });
    } catch (error) {
      console.log(error);
    } finally {
      alert("email send successfully");
      handlePdfModalClose();
      window.location.reload();
    }
  };

  const handleDetails = async (operation, e, ind) => {
    let tempDetails = details;

    if (!tempDetails[ind]) {
      tempDetails[ind] = {
        quantity: "",
        description: "",
        unit_price: "",
        total: "",
      };
    }

    tempDetails[ind][operation] = e.target.value;

    setDetails([...tempDetails]);
  };

  const handleDbDetails = async (operation, operation2, e, ind) => {
    let tempDbDetails = dbDetails;

    document.getElementById(`${operation}-${ind}`).value = e.target.value;
    tempDbDetails[ind][operation2] = e.target.value;

    setDbDetails([...tempDbDetails]);
  };

  const getSubTotal = () => {
    let subTotal = 0;
    details.forEach((d) => {
      subTotal = subTotal + parseInt(d?.total);
    });
    return subTotal;
  };

  const getGrandTotal = () => {
    return getSubTotal() + parseInt(tax);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_EMAIL_PUBLIC_KEY);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    const fetcher = async () => {
      let invoicesData = await fetchInvoices();
      if (invoicesData?.length == 0) {
        setInvoiceNo("23999");
      }
      invoicesData.forEach((inv, ind) => {
        if (ind === invoicesData.length - 1) {
          setInvoiceNo(invoicesData[ind]?.invoice_no);
        }
      });
      setInvoices([...invoicesData]);
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    dbDetails.forEach((db, ind) => {
      document.getElementById(`db-qty-${ind}`).value = db?.quantity;
      document.getElementById(`db-desc-${ind}`).value = db?.description;
      document.getElementById(`db-unit-price-${ind}`).value = db?.unit_price;
      document.getElementById(`db-total-${ind}`).value = db?.total;
    });
  }, [dbDetails]);

  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="invoice-management" />}
        <div className="col-md-10 p-4" style={{ height:'90vh',overflowY:'auto' }}>
          <div className="d-flex justify-content-end mb-5">
            <button
              className="btn "
              style={{
                width: "fit-content",
                background: "#90EE90",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                setUpdate(false);
                setShowCreate(true);
                setInvoiceNo(parseInt(invoiceNo) + 1);
              }}
            >
              <AddIcon />
              <span className="ms-2">create invoice</span>
            </button>
          </div>

          <table className="table mt-1 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Invoice No</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {invoices && invoices?.length !== 0 ? (
              invoices.map((invoice, index) => (
                <tbody>
                  <tr>
                    <th scope="col">{index + 1}.</th>
                    <th scope="col">{invoice?.invoice_no}</th>

                    <th scope="col ">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate(true);
                          setShowCreate(true);
                          setInvoiceId(invoice?._id);
                          setCompanyName(invoice?.company_name);
                          setCompanyAddress(invoice?.company_address);
                          setBillingAdd(invoice?.billing_address);
                          setShippingAdd(invoice?.shipping_address);
                          setCompanyEmail(invoice?.company_email);
                          setTax(invoice?.tax);
                          setCompanyPhoneNo(invoice?.company_phone_no);
                          setDate(invoice?.invoice_date);
                          setInvoiceNo(invoice?.invoice_no);
                          setDbDetails(invoice?.details);
                          setDetailsCnt([]);
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete(invoice?._id);
                        }}
                      />
                    </th>
                  </tr>
                </tbody>
              ))
            ) : (
              <>
                <p>no data found</p>
              </>
            )}
          </table>
        </div>
      </div>

      <Modal
        show={showCreate}
        onHide={handleCreateModalClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{update ? "Update Invoice" : "Add Invoice"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group mt-4">
              <label class="form-label" for="company-name">
                Company Name
              </label>
              <input
                type="text"
                id="company-name "
                value={companyName}
                className="form-control"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="company-address">
                Company Address
              </label>
              <textarea
                type="text"
                id="company-address  "
                className="form-control"
                value={companyAddress}
                onChange={(e) => {
                  setCompanyAddress(e.target.value);
                }}
              />
            </div>

            <div className="form-group    mt-4">
              <label class="form-label" for="company-phone-no">
                Company Phone No
              </label>
              <input
                type="text"
                value={companyPhoneNo}
                id="company-phone-no  "
                className="form-control"
                onChange={(e) => {
                  setCompanyPhoneNo(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="company-email">
                Company Email
              </label>
              <input
                type="text"
                id="company-email  "
                className="form-control"
                value={companyEmail}
                onChange={(e) => {
                  setCompanyEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="invoice-no">
                Invoice No
              </label>
              <input
                type="text"
                id="invoice-no "
                className=" form-control"
                value={invoiceNo}
                onChange={(e) => {
                  setInvoiceNo(e.target.value);
                }}
                disabled={true}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="invoice-no">
                Date
              </label>
              <input
                type="text"
                id="invoice-date  "
                className="form-control"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="billing-address">
                Billing Address
              </label>
              <textarea
                type="text"
                id="billing-address "
                className=" form-control"
                value={billingAdd}
                onChange={(e) => {
                  setBillingAdd(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label class="form-label" for="shipping-address">
                Shipping Address
              </label>
              <textarea
                type="text"
                id="shipping-address  "
                className="form-control"
                value={shippingAdd}
                onChange={(e) => {
                  setShippingAdd(e.target.value);
                }}
              />
            </div>

            <div className="form-group    mt-4">
              <label class="form-label" for="tax">
                TAX
              </label>
              <input
                value={tax}
                type="text"
                id="tax"
                className="form-control"
                onChange={(e) => {
                  setTax(e.target.value);
                }}
              />
            </div>

            {dbDetails.length !== 0 &&
              dbDetails.map((_, ind) => (
                <>
                  <div className="mt-4">
                    <div className="d-flex justify-content-between">
                      <label className="pb-1">Attached Details</label>
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <input
                      type="text"
                      id={`db-qty-${ind}`}
                      className="form-control"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDbDetails("db-qty", "quantity", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`db-desc-${ind}`}
                      className="ms-2 form-control"
                      placeholder="description"
                      onChange={(e) => {
                        handleDbDetails("db-desc", "description", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`db-unit-price-${ind}`}
                      className="ms-2 form-control"
                      placeholder="unit price"
                      onChange={(e) => {
                        handleDbDetails("db-unit-price", "unit_price", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`db-total-${ind}`}
                      className="ms-2 form-control"
                      placeholder="total"
                      onChange={(e) => {
                        handleDbDetails("db-total", "total", e, ind);
                      }}
                    />
                  </div>
                </>
              ))}

            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Add Details</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    const tempDetailsCnt = detailsCnt;
                    tempDetailsCnt.push(detailsCnt.length + 1);
                    setDetailsCnt([...tempDetailsCnt]);
                  }}
                >
                  Add details <AddIcon />
                </button>
              </div>
            </div>

            {detailsCnt.length !== 0 &&
              detailsCnt.map((_, ind) => (
                <>
                  <div className="d-flex mt-2">
                    <input
                      type="text"
                      id={`qty-${ind}`}
                      className="form-control"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDetails("quantity", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`desc-${ind}`}
                      className="ms-2 form-control"
                      placeholder="description"
                      onChange={(e) => {
                        handleDetails("description", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`unit-price-${ind}`}
                      className="ms-2 form-control"
                      placeholder="unit price"
                      onChange={(e) => {
                        handleDetails("unit_price", e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`total-${ind}`}
                      className="ms-2 form-control"
                      placeholder="total"
                      onChange={(e) => {
                        handleDetails("total", e, ind);
                      }}
                    />
                  </div>
                </>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleCreateModalClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              {
                update ? handleUpdate() : handleCreate();
              }
            }}
          >
            {update ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPdf} onHide={handlePdfModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>send pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="form-group mt-4">
              <label class="form-label" for="receiver-name">
                Receiver Name:
              </label>
              <input
                type="text"
                id="receiver-name"
                className=" form-control"
                onChange={(e) => {
                  setReceiverName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-4">
              <label class="form-label" for="receiver-email">
                Receiver Email
              </label>
              <input
                type="text"
                id="receiver-email"
                className=" form-control"
                onChange={(e) => {
                  setReceiverEmail(e.target.value);
                }}
              />
            </div>

            <div id="content" className="mt-5 border border-secondary">
              <div className="d-flex justify-content-between ms-3 me-3">
                <div className="d-flex flex-column">
                  <p className="m-0 fw-bold">{companyName}</p>
                  <p className="m-0">Address</p>
                  <p className="m-0">{companyAddress}</p>
                  <p className="m-0">{companyPhoneNo}</p>
                  <p className="m-0">{companyEmail}</p>
                </div>
                <div className=" w-50 d-flex  justify-content-center">
                  <p
                    className="fw-bold"
                    style={{
                      zoom: "5",
                      marginBottom: "0px",
                    }}
                  >
                    INVOICE
                  </p>
                </div>
              </div>
              <hr
                className="me-3 ms-3"
                style={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  opacity: 1,
                }}
              />
              <div className="d-flex justify-content-end ms-3 me-3">
                <p>
                  Invoice No. <span>{invoiceNo}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;Date:{" "}
                  <span>{date}</span>{" "}
                </p>
              </div>

              <div
                class="d-flex justify-content-start ms-3 me-3"
                style={{ background: "#D3D3D3" }}
              >
                <p className="mb-0">Bill To</p>
                <p className="mb-0 invoice_ship_to">Ship To</p>
              </div>

              <hr
                className="me-3 ms-3 mt-0"
                style={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  opacity: 1,
                }}
              />

              <div class="d-flex justify-content-start mt-2 ms-3 me-3">
                <div className="d-flex flex-column">
                  <p className="m-0">{companyName}</p>
                  <p className="m-0">Address</p>

                  <p className="m-0">{billingAdd}</p>
                </div>
                <div className="d-flex flex-column invoice_ship_to_desc">
                  <p className="m-0">{companyName}</p>
                  <p className="m-0">Address</p>

                  <p className="m-0">{shippingAdd}</p>
                </div>
              </div>

              <div class="d-flex justify-content-center mt-5 ms-3 me-3">
                <table className="w-100 table-bordered">
                  <thead>
                    <tr style={{ background: "#D3D3D3" }}>
                      <th className="fw-bold">QTY</th>
                      <th className="fw-bold">DESCRIPTION</th>
                      <th className="fw-bold">UNIT PRICE</th>
                      <th className="fw-bold">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.length !== 0 &&
                      details.map((d, _) => (
                        <tr>
                          <th>{d?.quantity}</th>
                          <th>{d?.description}</th>
                          <th>{d?.unit_price}</th>
                          <th>{d?.total}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between mt-5 ms-3 me-3 mb-3">
                <p className="invoice_thank_you">Thank You</p>

                <table className="w-50 table table-bordered">
                  <tbody>
                    <tr>
                      <th>SUBTOTAL</th>
                      <th>{getSubTotal()}</th>
                    </tr>
                    <tr>
                      <th>TAX</th>
                      <th>{tax}</th>
                    </tr>
                    <tr>
                      <th>GRAND TOTAL</th>
                      <th>{getGrandTotal()}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handlePdfModalClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await handleGeneratePDF();
            }}
          >
            Download & Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InvoiceManagement;
