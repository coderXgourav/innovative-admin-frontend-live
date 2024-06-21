import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import { createPurchaseOrders, fetchPurchaseOrders, updatePurchaseOrders, deletePurchaseOrders } from "../../api-calls/apicalls"
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from "@emailjs/browser";
import "./purchaseOrderManagement.css"
import { useNavigate } from "react-router-dom";




function PurchaseOrderManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [update, setUpdate] = useState(false)
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [pONo, setPoNo] = useState(0)
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [dbCompanyLogo, setDbCompanyLogo] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [companyPhoneNo, setCompanyPhoneNo] = useState("")
  const [companyEmail, setCompanyEmail] = useState("")
  const [date, setDate] = useState("")
  const [billingName, setBillingName] = useState("")
  const [billingPhoneNo, setBillingPhoneNo] = useState("")
  const [billingEmail, setBillingEmail] = useState("")
  const [billingAddress, setBillingAddress] = useState("")
  const [gratuity, setGratuity] = useState(0)
  const [shippingCharges, setShippingCharges] = useState(0)
  const [convenienceFee, setConvenienceFee] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const [courierCharges, setCourierCharges] = useState(0)
  const [deduction, setDeduction] = useState(0)
  const [retention, setRetention] = useState(0)
  const [roundOff, setRoundOff] = useState(0)
  const [notes, setNotes] = useState("")
  const [termsAndCond, setTermsAndCond] = useState("")
  const [details, setDetails] = useState([])
  const [detailsCnt, setDetailsCnt] = useState([])
  const [showPdf, setShowPdf] = useState(false)
  const [receiverEmail, setReceiverEmail] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [pOId, setPoId] = useState("")
  const [dbDetails, setDbDetails] = useState([])

  const navigate = useNavigate();

  useEffect(() => emailjs.init("ptuqDG8Zl2iuDoPXR"), []);

  const handleGeneratePDF = async () => {
    // console.log("yesss")
    const input = document.getElementById('content');

    await html2canvas(input)
      .then(async (canvas) => {
        // console.log("then")
        const imgData = canvas.toDataURL('image/png');
        let pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
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

        // console.log(pdf)
        pdf.save(`Purchase-Order-${pONo}`)
        handlePdfModalClose()
        // update ? setUpdate(false) : setUpdate(true)
        // window.location.reload()
        // Save the compressed PDF
        // const compressedPdf = pdfData;
        // await handleSend(compressedPdf)
      });
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
      alert("email send successfully")
      handlePdfModalClose()
      window.location.reload()
    }
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleCreateModalClose = () => {
    setShowCreate(false);
    window.location.reload()
  };

  const handlePdfModalClose = () => {
    setShowPdf(false)
    window.location.reload()
  }

  const handleCreate = async () => {




    let tempAddData = {
      purchase_order_no: pONo,
      purchase_order_date: date,

      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      billing_name: billingName,
      billing_phone_no: billingPhoneNo,
      billing_email: billingEmail,
      billing_address: billingAddress,
      gratuity: gratuity,
      shipping_charges: shippingCharges,
      convenience_fee: convenienceFee,
      courier_charges: courierCharges,
      deduction: deduction,
      delivery_charges: deliveryCharges,
      retention: retention,
      round_off: roundOff,
      notes: notes,
      terms_condition: termsAndCond,
      details: details

    }

    let addData = new FormData()

    addData.append("data", JSON.stringify(tempAddData))

    addData.append("logo", companyLogo)

    const createdData = await createPurchaseOrders(addData)

    // if (createdData.success == true) {
    //   alert("purchase order created")
    //   setShowCreate(false)
    //   setShowPdf(true)
    //   setCompanyLogo(createdData?.insertedData?.company_logo)
    // }
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("purchase order created successfully")
      // handleClose()
      // window.location.reload();
      setShowCreate(false)
      setShowPdf(true)
      setCompanyLogo(createdData?.insertedData?.company_logo)
    }

  }

  const handleDetails = async (operation, e, ind) => {
    let tempDetails = details

    if (!tempDetails[ind]) {
      tempDetails[ind] = {
        "description":"",
        "quantity": "",
        "rate": "",
        "discount": "",
        "gst": ""
      }
    }

    tempDetails[ind][operation] = e.target.value



    setDetails([...tempDetails])


  }

  const handleUpdate = async () => {
    let tempUpdateData = {
      purchase_order_id: pOId,
      purchase_order_no: pONo,
      purchase_order_date: date,
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      billing_name: billingName,
      billing_phone_no: billingPhoneNo,
      billing_email: billingEmail,
      billing_address: billingAddress,
      gratuity: gratuity,
      shipping_charges: shippingCharges,
      convenience_fee: convenienceFee,
      courier_charges: courierCharges,
      deduction: deduction,
      delivery_charges: deliveryCharges,
      retention: retention,
      round_off: roundOff,
      notes: notes,
      terms_condition: termsAndCond,
      details: dbDetails.concat(details)
    }


    let updateData = new FormData()

    updateData.append("data", JSON.stringify(tempUpdateData))

    if (companyLogo !== "") {
      updateData.append("logo", companyLogo)
    }

    const updatedData = await updatePurchaseOrders(updateData)

    // if (updatedData.success == true) {
    //   alert("invoice updated")
    //   setDetails(dbDetails.concat(details))
    //   setShowCreate(false)
    //   setShowPdf(true)

    // }

    if (
      updatedData?.success === "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success === "no") {
      alert("system error try again leter");
    } else if (updatedData?.success === "yes") {
      alert("purchase order updated successfully")
      // window.location.reload();
      setDetails(dbDetails.concat(details))
      setShowCreate(false)
      setShowPdf(true)
      // setUpdate(false)
    }
  }

  const handleDelete = async (id) => {
    let deleteData={
      poId:id
    }



   const deletedData= await deletePurchaseOrders(deleteData)
   
  //  if(deletedData){
  //   alert("invoice deleted")
  //  window.location.reload()
  //  }

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

    alert("purchase order deleted successfully")
    window.location.reload();
  }


  }

  const getTotal = () => {

  }

  const handleDbDetails = async (operation, operation2, e, ind) => {

    let tempDbDetails = dbDetails

    document.getElementById(`${operation}-${ind}`).value = e.target.value
    tempDbDetails[ind][operation2] = e.target.value



    setDbDetails([...tempDbDetails])


  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let poData = await fetchPurchaseOrders();

      if (poData?.message === "jwt expired") {
        return navigate("/");
      } else {
      setPurchaseOrders([...poData]);}
    };

    fetcher();
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [])

  useEffect(() => {
    dbDetails.forEach((db, ind) => {
      document.getElementById(`db-desc-${ind}`).value = db?.quantity
      document.getElementById(`db-qty-${ind}`).value = db?.quantity
      document.getElementById(`db-disc-${ind}`).value = db?.discount
      document.getElementById(`db-rate-${ind}`).value = db?.rate
      document.getElementById(`db-gst-${ind}`).value = db?.gst
    })
  }, [dbDetails])

  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="purchase-order-management" />}
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
                setShowCreate(true)
                setDbDetails([])
                setUpdate(false)
              }}
            >
              <AddIcon />
              <span className="ms-2">create purchase order</span>
            </button>
          </div>
          <table className="table mt-1 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Purchase Order No</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {purchaseOrders && purchaseOrders?.length !== 0 ? (
              purchaseOrders.map((po, index) => (
                <tbody>
                  <tr>
                    <th scope="col">{index + 1}.</th>
                    <th scope="col">{po?.purchase_order_no}</th>

                    <th scope="col ">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate(true)
                          setShowCreate(true)
                          setPoId(po?._id)
                          setCompanyAddress(po?.company_address)
                          setCompanyName(po?.company_name)
                          setCompanyEmail(po?.company_email)
                          setCompanyPhoneNo(po?.company_phone_no)
                          setBillingAddress(po?.billing_address)
                          setBillingName(po?.billing_name)
                          setBillingEmail(po?.billing_email)
                          setBillingPhoneNo(po?.billing_phone_no)
                          setNotes(po?.notes)
                          setTermsAndCond(po?.terms_condition)
                          setDbCompanyLogo(po?.company_logo)
                          setDbDetails(po?.details)
                          setDetailsCnt([])
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}

                        onClick={() => {
handleDelete(po?._id)
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
      <Modal show={showCreate} onHide={handleCreateModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Purchase Order" : "Add Purchase Order"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {dbCompanyLogo && dbCompanyLogo !== "" && <div className="form-group mt-4">
              <label
                class="form-label"
                for="db-company-logo"
              >
                Attached Company Logo
              </label>
              <img
                className="h-50 w-50 form-control"
                id="db-company-logo "
                alt="attached-logo"
                src={dbCompanyLogo}
              />

            </div>}

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="company-logo"
              >
                {update ? "Change Company Logo" : "Company Logo"}
              </label>
              <input
                type="file"
                id="company-logo "
                className="form-control"
                onChange={(e) => {
                  setCompanyLogo(e.target.files[0])
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="company-name"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company-name "
                value={companyName}
                className="form-control"
                onChange={(e) => {
                  setCompanyName(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="company-address"
              >
                Company Address
              </label>
              <textarea
                type="text"
                id="company-address  "
                className="form-control"
                value={companyAddress}
                onChange={(e) => {
                  setCompanyAddress(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="company-phone-no"
              >
                Company Phone No
              </label>
              <input
                type="text"
                value={companyPhoneNo}
                id="company-phone-no  "
                className="form-control"
                onChange={(e) => {
                  setCompanyPhoneNo(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="company-email"
              >
                Company Email
              </label>
              <input
                type="text"
                id="company-email  "
                className="form-control"
                value={companyEmail}
                onChange={(e) => {
                  setCompanyEmail(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="purchase-order-no"
              >
                Purchase Order No
              </label>
              <input
                type="number"
                id="purchase-order-no"
                className=" form-control"
                value={pONo}
                onChange={(e) => {
                  setPoNo(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="purchase-order-date"
              >
                Date
              </label>
              <input
                type="text"
                id="purchase-order-date"
                className="form-control"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="billing-name"
              >
                Billing Name
              </label>
              <input
                type="text"
                id="billing-name"
                className=" form-control"
                value={billingName}
                onChange={(e) => {
                  setBillingName(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="billing-address"
              >
                Billing Address
              </label>
              <input
                type="text"
                id="billing-address"
                className=" form-control"
                value={billingAddress}
                onChange={(e) => {
                  setBillingAddress(e.target.value)
                }}
              />

            </div>
            <div className="form-group mt-4">
              <label
                class="form-label"
                for="billing_phone_no"
              >
                Billing Phone NO
              </label>
              <input
                type="text"
                id="billing_phone_no"
                className=" form-control"
                value={billingPhoneNo}
                onChange={(e) => {
                  setBillingPhoneNo(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="billing_email"
              >
                Billing Email
              </label>
              <input
                type="text"
                id=" billing_email"
                className=" form-control"
                value={billingEmail}
                onChange={(e) => {
                  setBillingEmail(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="gratuity"
              >
                gratuity
              </label>
              <input
                type="number"
                id="gratuity"
                className="form-control"
                value={gratuity}
                onChange={(e) => {
                  setGratuity(e.target.value)
                }}
              />

            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="shipping_charges"
              >
                shipping charges
              </label>
              <input
                type="number"
                id="shipping_charges"
                className="form-control"
                value={shippingCharges}
                onChange={(e) => {
                  setShippingCharges(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="convenience_fee"
              >
                convenience fee
              </label>
              <input
                type="number"
                id="convenience_fee"
                className="form-control"
                value={convenienceFee}
                onChange={(e) => {
                  setConvenienceFee(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="courier_charges"
              >
                courier charges
              </label>
              <input
                type="number"
                id="courier_charges"
                className="form-control"
                value={courierCharges}
                onChange={(e) => {
                  setCourierCharges(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="deduction"
              >
                Deduction
              </label>
              <input
                type="number"
                id="deduction"
                className="form-control"
                value={deduction}
                onChange={(e) => {
                  setDeduction(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="delivery_charges"
              >
                delivery charges
              </label>
              <input
                type="number"
                id="delivery_charges"
                className="form-control"
                value={deliveryCharges}
                onChange={(e) => {
                  setDeliveryCharges(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="retention"
              >
                retention
              </label>
              <input
                type="number"
                id="retention"
                className="form-control"
                value={retention}
                onChange={(e) => {
                  setRetention(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="round_off"
              >
                round off
              </label>
              <input
                type="number"
                id="round_off"
                className="form-control"
                value={roundOff}
                onChange={(e) => {
                  setRoundOff(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="notes"
              >
                notes
              </label>
              <textarea
                type="text"
                id="notes"
                className="form-control"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value)
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label
                class="form-label"
                for="terms-and-condition"
              >
                terms and condition
              </label>
              <textarea
                type="text"
                id="terms-and-condition"
                className="form-control"
                value={termsAndCond}
                onChange={(e) => {
                  setTermsAndCond(e.target.value)
                }}
              />
            </div>
            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <label className="pb-1">{update?"Attached Details":""}</label>
              </div>
            </div>
            {dbDetails.length !== 0 &&
              dbDetails.map((_, ind) => (
                <>

                  <div className="d-flex mt-2">
                  <input
                      type="text"
                      id={`db-desc-${ind}`}
                      className="form-control"
                      placeholder="desc"
                      onChange={(e) => {
                        handleDbDetails("db-desc", "description", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-qty-${ind}`}
                      className="form-control"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDbDetails("db-qty", "quantity", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-disc-${ind}`}
                      className="ms-2 form-control"
                      placeholder="discount"
                      onChange={(e) => {
                        handleDbDetails("db-disc", "discount", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-rate-${ind}`}
                      className="ms-2 form-control"
                      placeholder="rate"
                      onChange={(e) => {
                        handleDbDetails("db-rate", "rate", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-gst-${ind}`}
                      className="ms-2 form-control"
                      placeholder="gst"
                      onChange={(e) => {
                        handleDbDetails("db-gst", "gst", e, ind)
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
                      id={`desc-${ind}`}
                      className="form-control"
                      placeholder="desc"
                      onChange={(e) => {
                        handleDetails("description", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`qty-${ind}`}
                      className="form-control"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDetails("quantity", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`rate-${ind}`}
                      className="ms-2 form-control"
                      placeholder="rate"
                      onChange={(e) => {
                        handleDetails("rate", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`discount-${ind}`}
                      className="ms-2 form-control"
                      placeholder="discount"
                      onChange={(e) => {
                        handleDetails("discount", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`gst-${ind}`}
                      className="ms-2 form-control"
                      placeholder="gst"
                      onChange={(e) => {
                        handleDetails("gst", e, ind)
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

              { update ? handleUpdate() : handleCreate() }
            }}
          >
            {update ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPdf} onHide={handlePdfModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            send pdf
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="form-group mt-4">
              <label
                class="form-label"
                for="receiver-name"
              >
                Receiver Name:
              </label>
              <input
                type="text"
                id="receiver-name"
                className=" form-control"
                onChange={(e) => {
                  setReceiverName(e.target.value)
                }}
              />
            </div>
            <div className="form-group mt-4">
              <label
                class="form-label"
                for="receiver-email"
              >
                Receiver Email
              </label>
              <input
                type="text"
                id="receiver-email"
                className=" form-control"
                onChange={(e) => {
                  setReceiverEmail(e.target.value)
                }}
              />
            </div>
            <div id="content" className="mt-5 border border-secondary" >
              <div className="d-flex justify-content-between m-5">
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <p className="fw-bold">{companyName}</p>
                  <p>{companyAddress}</p>
                  <p>{companyPhoneNo}</p>
                  <p>{companyEmail}</p>
                </div>
                <div class="Purchase_order_logo_container d-flex justify-content-end">
                  <img src={companyLogo} alt="logo" />
                </div>
              </div>
              <div className="d-flex justify-content-between m-5">
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <p className="mb-4">Bill to :</p>
                  <p>{billingName}</p>
                  <p>{billingAddress}</p>
                  <p>{billingEmail}</p>
                  <p>{billingPhoneNo}</p>
                </div>
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <div >
                    <p>PO#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{pONo}</span></p>
                    <p>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{date}</span></p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-5 ms-3 me-3">
                <table className="w-100 table-bordered">
                  <thead>
                    <tr style={{ background: "#D3D3D3" }}>
                      <th className="fw-bold">QTY</th>
                      <th className="fw-bold">RATE</th>
                      <th className="fw-bold">DISCOUNT</th>
                      <th className="fw-bold">GST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.length !== 0 &&
                      details.map((d, _) => (
                        <tr >
                          <th >{d?.quantity}</th>
                          <th >{d?.rate}</th>
                          <th>{d?.discount}</th>
                          <th >{d?.gst}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end mt-5 ms-3 me-3 mb-3">
                <table className="w-50 table table-bordered">
                  <tbody >
                    <tr >
                      <th >TOTAL</th>
                      <th>00</th>
                    </tr>
                    <tr>
                      <th >GST</th>
                      <th>00</th>
                    </tr>
                    <tr>
                      <th>gratuity</th>
                      <th>{gratuity}</th>
                    </tr>
                    <tr>
                      <th> shipping charges</th>
                      <th>{shippingCharges}</th>
                    </tr>
                    <tr>
                      <th> convenience fee</th>
                      <th>{convenienceFee}</th>
                    </tr>
                    <tr>
                      <th> courier charges</th>
                      <th>{courierCharges}</th>
                    </tr>
                    <tr>
                      <th> retention</th>
                      <th>{retention}</th>
                    </tr>
                    <tr>
                      <th> round off</th>
                      <th>{roundOff}</th>
                    </tr>
                    <tr>
                      <th>deduction</th>
                      <th>{deduction}</th>
                    </tr>
                    <tr>
                      <th>delivery charges</th>
                      <th>{deliveryCharges}</th>
                    </tr>
                    <tr>
                      <th>NET AMOUNT</th>
                      <th>00</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="m-5">
                <p className="fw-bold">Notes</p>
                <p>{notes}</p>
              </div>
              <div className="m-5">
                <p className="fw-bold">Terms And Condition</p>
                <p>{termsAndCond}</p>
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
              await handleGeneratePDF()
            }}
          >
            Download & Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PurchaseOrderManagement