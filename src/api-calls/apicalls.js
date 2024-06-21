import axios from "axios";
const token = localStorage.getItem("token");

export const fetchTemplates = async () => {
  let templatesData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/template`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    templatesData = response.data.allTemplates;
    // console.log(templatesData)
  } catch (error) {
    // console.log("err", error);
    templatesData=error?.response?.data;
  } finally {
    return templatesData;
  }
};

export const createTemplates = async (addData) => {
  let tempTemplates = [];
  try {
    console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/template`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const updateTemplates = async (updateData) => {
  let tempTemplates = [];
  try {
    console.log("template data", updateData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/template`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const deleteTemplates = async (deleteData) => {
  let tempTemplates = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/template`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const fetchMcqTemplates = async () => {
  let templatesData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,

      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    templatesData = response.data.allMcqTemplates;
    // console.log(templatesData)
  } catch (error) {
    // console.log("err", error);
    templatesData=error?.response?.data;
  } finally {
    return templatesData;
  }
};

export const createMcqTemplates = async (addData) => {
  let tempTemplates = [];
  try {
    console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",

        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const updateMcqTemplates = async (updateData) => {
  let tempTemplates = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const updateMcqTemplatesAttempts = async (updateData) => {
  let tempTemplates = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
      data: updateData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const deleteMcqTemplates = async (deleteData) => {
  let tempMcqTemplates = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMcqTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not delete mcq templates");
    tempMcqTemplates=error?.response?.data;
  } finally {
    return tempMcqTemplates;
  }
};

export const createInvoices = async (addData) => {
  let tempInvoices = [];
  try {
    console.log("invoice data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
      data: addData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempInvoices = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempInvoices=error?.response?.data;
  } finally {
    return tempInvoices;
  }
};

export const fetchInvoices = async () => {
  let invoicesData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    invoicesData = response.data.fetchedData;
    // console.log(templatesData)
  } catch (error) {
    // console.log("err", error);
    invoicesData=error?.response?.data;
  } finally {
    return invoicesData;
  }
};

export const updateInvoices = async (updateData) => {
  let invoicesData = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
      data: updateData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      invoicesData = res.data;
    });
  } catch (error) {
    // console.log("can not update invoices");
    invoicesData=error?.response?.data;
  } finally {
    return invoicesData;
  }
};

export const deleteInvoices = async (deleteData) => {
  let tempInvoice = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempInvoice = res.data;
    });
  } catch (error) {
    // console.log("can not delete invoice");
    tempInvoice=error?.response?.data;
  } finally {
    return tempInvoice;
  }
};

export const fetchUsers = async () => {
  let usersData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/user`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    usersData = response.data.allUserData;
  } catch (error) {
    // console.log("err", error);
    usersData=error?.response?.data;
  } finally {
    return usersData;
  }
};

export const createUsers = async (userData) => {
  let tempUsers = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/user/create-user`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempUsers = res.data;
    });
  } catch (error) {
    // console.log("can not save users");
    tempUsers=error?.response?.data;
  } finally {
    return tempUsers;
  }
};

export const updateUsers = async (userData) => {
  let tempUsers = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/user/`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempUsers = res.data;
    });
  } catch (error) {
    // console.log("can not update users");
    tempUsers=error?.response?.data;
  } finally {
    return tempUsers;
  }
};

export const deleteUsers = async (deleteData) => {
  let tempUser = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/user`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempUser = res.data;
    });
  } catch (error) {
    // console.log("can not delete user");
    tempUser=error?.response?.data;
  } finally {
    return tempUser;
  }
};

export const createPurchaseOrders = async (addData) => {
  let tempPurchaseOrders = [];
  try {
    // console.log("po data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPurchaseOrders = res.data;
    });
  } catch (error) {
    // console.log("can not create purchase order");
    tempPurchaseOrders=error?.response?.data;
  } finally {
    return tempPurchaseOrders;
  }
};

export const fetchPurchaseOrders = async () => {
  let tempPurchaseOrders = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempPurchaseOrders = response.data.fetchedData;
  } catch (error) {
    // console.log("err", error);
    tempPurchaseOrders=error?.response?.data;
  } finally {
    return tempPurchaseOrders;
  }
};

export const updatePurchaseOrders = async (updateData) => {
  let poData = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      poData = res.data;
    });
  } catch (error) {
    // console.log("can not update purchase orders");
    poData=error?.response?.data;
  } finally {
    return poData;
  }
};

export const deletePurchaseOrders = async (deleteData) => {
  let tempPurchaseOrders = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPurchaseOrders = res.data;
    });
  } catch (error) {
    // console.log("can not delete purchase orders");
    tempPurchaseOrders=error?.response?.data;
  } finally {
    return tempPurchaseOrders;
  }
};

export const createQuizTemplates = async (addData) => {
  let tempTemplates = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempTemplates=error?.response?.data;
  } finally {
    return tempTemplates;
  }
};

export const updateQuizTemplates = async (updateData) => {
  let tempQuizTemplates = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempQuizTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not create templates");
    tempQuizTemplates=error?.response?.data;
  } finally {
    return tempQuizTemplates;
  }
};

export const deleteQuizTemplates = async (deleteData) => {
  let tempQuizTemplates = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempQuizTemplates = res.data;
    });
  } catch (error) {
    // console.log("can not delete quiz templates");
    tempQuizTemplates=error?.response?.data;
  } finally {
    return tempQuizTemplates;
  }
};

export const fetchQuizTemplates = async () => {
  let templatesData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    templatesData = response.data.allQuizTemplates;
    // console.log(templatesData)
  } catch (error) {
    // console.log("err", error);
    templatesData=error?.response?.data;
  } finally {
    return templatesData;
  }
};

export const createFaqs = async (faqData) => {
  let tempFaq = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
      data: faqData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempFaq = res.data;
    });
  } catch (error) {
    tempFaq = error?.response?.data;
  } finally {
    return tempFaq;
  }
};

export const fetchFaqs = async () => {
  let faqsData = [];
  // console.log("fetch faq")
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    faqsData = response.data.allFaqData;
  } catch (error) {
    // console.log("err", error);
    faqsData = error?.response?.data;
  } finally {
    return faqsData;
  }
};

export const updateFaqs = async (faqData) => {
  let tempFaq = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/faq/`,
      data: faqData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempFaq = res.data;
    });
  } catch (error) {
    console.log("can not update faq");
  } finally {
    return tempFaq;
  }
};

export const deleteFaqs = async (deleteData) => {
  let tempFaq = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempFaq = res.data;
    });
  } catch (error) {
    console.log("can not delete faq");
  } finally {
    return tempFaq;
  }
};

export const createGallery = async (addData) => {
  let tempGallery = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempGallery = res.data;
    });
  } catch (error) {
    // console.log("can not create gallery");
    tempGallery=error?.response?.data;
  } finally {
    return tempGallery;
  }
};

export const fetchGalleries = async () => {
  let galleriesData = [];
  try {

    const response = await axios(
      {method: "get",
      url:`${process.env.REACT_APP_BASE_URL}/api/gallery`,
      headers: {
        authorization: `Bearer ${token}`
      },
      }
    );
    galleriesData = response.data.allGalleryData;
  } catch (error) {
    // console.log("err", error);
    galleriesData = error?.response?.data;
  } finally {
    return galleriesData;
  }
};

export const updateGallery = async (updateData) => {
  let tempGalleries = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempGalleries = res.data;
    });
  } catch (error) {
    // console.log("can not update galleries");
    tempGalleries=error?.response?.data;
  } finally {
    return tempGalleries;
  }
};

export const deleteGallery = async (deleteData) => {
  let tempGallery = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempGallery = res.data;
    });
  } catch (error) {
    // console.log("can not delete gallery");
    tempGallery=error?.response?.data;
  } finally {
    return tempGallery;
  }
};

export const createCategories = async (addData) => {
  let tempCategory = [];
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/category`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCategory = res.data;
    });
  } catch (error) {
    // console.log("can not create category");
    tempCategory=error?.response?.data;
  } finally {
    return tempCategory;
  }
};

export const fetchCategories = async () => {
  let categoriesData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/category`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    categoriesData = response.data.allCategoryData;
  } catch (error) {
    // console.log("err", error);
    categoriesData=error?.response?.data;
  } finally {
    return categoriesData;
  }
};

export const updateCategories = async (updateData) => {
  let tempCats = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/category`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCats = res.data;
    });
  } catch (error) {
    // console.log("can not update categories");
    tempCats=error?.response?.data;
  } finally {
    return tempCats;
  }
};

export const deleteCategories = async (deleteData) => {
  let tempCat = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/category`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCat = res.data;
    });
  } catch (error) {
    // console.log("can not delete category");
    tempCat=error?.response?.data;
  } finally {
    return tempCat;
  }
};

export const createProducts = async (addData) => {
  let tempProducts = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/product`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempProducts = res.data;
    });
  } catch (error) {
    // console.log("can not create product");
    tempProducts=error?.response?.data;
  } finally {
    return tempProducts;
  }
};

export const fetchProducts = async () => {
  let productsData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/product`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    productsData = response.data.fetchedData;
  } catch (error) {
    // console.log("err", error);
    productsData=error?.response?.data;
  } finally {
    return productsData;
  }
};

export const updateProducts = async (updateData) => {
  let tempProds = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/product`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempProds = res.data;
    });
  } catch (error) {
    // console.log("can not update products");
    tempProds=error?.response?.data;
  } finally {
    return tempProds;
  }
};

export const deleteProducts = async (deleteData) => {
  let tempProd = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/product`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempProd = res.data;
    });
  } catch (error) {
    // console.log("can not delete product");
    tempProd=error?.response?.data;
  } finally {
    return tempProd;
  }
};

export const createTrainingModules = async (addData) => {
  let tempModules = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempModules = res.data;
    });
  } catch (error) {
    // console.log("can not create training modules");
    tempModules=error?.response?.data;
  } finally {
    return tempModules;
  }
};

export const fetchTrainingModules = async () => {
  let moduleData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    moduleData = response.data.fetchedData;
  } catch (error) {
    // console.log("err", error);
    moduleData=error?.response?.data;
  } finally {
    return moduleData;
  }
};

export const updateTrainingModules = async (updateData) => {
  let tempModules = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempModules = res.data;
    });
  } catch (error) {
    // console.log("can not update training modules");
    tempModules=error?.response?.data;
  } finally {
    return tempModules;
  }
};

export const deleteTrainingModules = async (deleteData) => {
  let tempModules = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempModules = res.data;
    });
  } catch (error) {
    // console.log("can not delete training modules");
    tempModules=error?.response?.data;
  } finally {
    return tempModules;
  }
};

export const createCus = async (faqData) => {
  let tempCus = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
      data: faqData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCus = res.data;
    });
  } catch (error) {
    // console.log("can not save cus");
    tempCus=error?.response?.data;
  } finally {
    return tempCus;
  }
};

export const fetchCus = async () => {
  let cusData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    cusData = response.data.allCusData;
  } catch (error) {
    // console.log("err", error);
    cusData=error?.response?.data;
  } finally {
    return cusData;
  }
};

export const updateCus = async (faqData) => {
  let tempCus = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
      data: faqData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCus = res.data;
    });
  } catch (error) {
    // console.log("can not update cus");
    tempCus=error?.response?.data;
  } finally {
    return tempCus;
  }
};

export const deleteCus = async (deleteData) => {
  let tempCus = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCus = res.data;
    });
  } catch (error) {
    // console.log("can not delete cus");
    tempCus=error?.response?.data;
  } finally {
    return tempCus;
  }
};

export const createTestimonials = async (addData) => {
  let tempMons = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
      data: addData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMons = res.data;
    });
  } catch (error) {
    // console.log("can not create testimonials");
    tempMons=error?.response?.data;
  } finally {
    return tempMons;
  }
};

export const fetchTestimonials = async () => {
  let testimonialData = [];
  try {
    const response = await axios({
      method: "get",

      url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,

      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    testimonialData = response.data.fetchedData;
  } catch (error) {
    // console.log("err", error);
    testimonialData=error?.response?.data;
  } finally {
    return testimonialData;
  }
};

export const updateTestimonials = async (updateData) => {
  let tempMons = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
      data: updateData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMons = res.data;
    });
  } catch (error) {
    // console.log("can not update testimonials");
    tempMons=error?.response?.data;
  } finally {
    return tempMons;
  }
};

export const deleteTestimonials = async (deleteData) => {
  let tempMons = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMons = res.data;
    });
  } catch (error) {
    // console.log("can not delete testimonial");
    tempMons=error?.response?.data;
  } finally {
    return tempMons;
  }
};

export const createServices = async (addData) => {
  let tempServices = [];
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/service`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempServices = res.data;
    });
  } catch (error) {
    // console.log("can not create service");
    tempServices=error?.response?.data;
  } finally {
    return tempServices;
  }
};

export const fetchServices = async () => {
  let serviceData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/service`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    serviceData = response.data.fetchedData;
  } catch (error) {
    // console.log("err", error);
    serviceData=error?.response?.data;
  } finally {
    return serviceData;
  }
};

export const updateServices = async (updateData) => {
  let serviceData = [];
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/service`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      serviceData = res.data;
    });
  } catch (error) {
    // console.log("can not update services");
    serviceData=error?.response?.data;
  } finally {
    return serviceData;
  }
};

export const deleteServices = async (deleteData) => {
  let serviceData = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/service`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      serviceData = res.data;
    });
  } catch (error) {
    // console.log("can not delete services");
    serviceData=error?.response?.data;
  } finally {
    return serviceData;
  }
};

export const createPartners = async (partnerData) => {
  let tempPartner = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/partner`,
      data: partnerData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPartner = res.data;
    });
  } catch (error) {
    // console.log("can not save partner");
    tempPartner=error?.response?.data;
  } finally {
    return tempPartner;
  }
};

export const fetchPartners = async () => {
  let partnersData = [];
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/partner`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    partnersData = response.data.allPartnerData;
  } catch (error) {
    // console.log("err", error);
    partnersData=error?.response?.data;
  } finally {
    return partnersData;
  }
};

export const updatePartners = async (faqData) => {
  let tempPartner = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/partner/`,
      data: faqData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPartner = res.data;
    });
  } catch (error) {
    // console.log("can not update partner");
    tempPartner=error?.response?.data;
  } finally {
    return tempPartner;
  }
};

export const deletePartners = async (deleteData) => {
  let tempPartner = [];
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/api/partner`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPartner = res.data;
    });
  } catch (error) {
    // console.log("can not delete partner");
    tempPartner=error?.response?.data;
  } finally {
    return tempPartner;
  }
};

export const logIn = async (userData) => {
  let tempUsers = [];
  try {
    console.log("userData", userData);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/user/signin`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      tempUsers = res.data;
    });
  } catch (error) {
    tempUsers = error?.response?.data;
  } finally {
    return tempUsers;
  }
};


export const verifyToken = async () => {
  let tokenData = [];
  try {
    
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/user/verify-token`,
      data: {jwt_token:token},
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      tokenData = res.data;
    });
  } catch (error) {
    tokenData = error?.response?.data;
  } finally {
    return tokenData;
  }
};

export const createOurMission = async (omData) => {
  let tempOurMission = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-mission`,
      data: omData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurMission = res.data;
    });
  } catch (error) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }
};

export const fetchOurMission  = async () => {
  let tempOurMission = [];
  
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-mission`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempOurMission = response.data.allOmData;
  } catch (error) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }
};

export const updateOurMission = async (omData) => {
  let tempOurMission = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-mission/`,
      data: omData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurMission = res.data;
    });
  } catch (error) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }
};

export const createOurVision = async (ovData) => {
  let tempOurVision = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-vision`,
      data: ovData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurVision = res.data;
    });
  } catch (error) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }
};

export const fetchOurVision  = async () => {
  let tempOurVision = [];
  
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-vision`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempOurVision = response.data.allOvData;
  } catch (error) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }
};

export const updateOurVision = async (ovData) => {
  let tempOurVision = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/our-vision/`,
      data: ovData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurVision = res.data;
    });
  } catch (error) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }
};

export const createAboutUs = async (aboutUsData) => {
  let tempAboutUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/about-us`,
      data: aboutUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempAboutUsData = res.data;
    });
  } catch (error) {
    tempAboutUsData = error?.response?.data;
  } finally {
    return tempAboutUsData;
  }
};

export const fetchAboutUs  = async () => {
  let tempAboutUsData = [];
  
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/about-us`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempAboutUsData = response.data.allAboutUsData;
  } catch (error) {
    tempAboutUsData = error?.response?.data;
  } finally {
    return tempAboutUsData;
  }
};

export const updateAboutUs = async (aboutUsData) => {
  let tempAboutUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/about-us/`,
      data: aboutUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempAboutUsData = res.data;
    });
  } catch (error) {
    tempAboutUsData = error?.response?.data;
  } finally {
    return tempAboutUsData;
  }
};

export const createCallUs = async (callUsData) => {
  let tempCallUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/call-us`,
      data: callUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCallUsData = res.data;
    });
  } catch (error) {
    tempCallUsData = error?.response?.data;
  } finally {
    return tempCallUsData;
  }
};

export const fetchCallUs  = async () => {
  let tempCallUsData = [];
  
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/call-us`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempCallUsData = response.data.allCallUsData;
  } catch (error) {
    tempCallUsData = error?.response?.data;
  } finally {
    return tempCallUsData;
  }
};

export const updateCallUs = async (callUsData) => {
  let tempCallUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/call-us/`,
      data: callUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempCallUsData = res.data;
    });
  } catch (error) {
    tempCallUsData = error?.response?.data;
  } finally {
    return tempCallUsData;
  }
};

export const createEmailUs = async (callUsData) => {
  let tempEmailUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/email-us`,
      data: callUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempEmailUsData = res.data;
    });
  } catch (error) {
    tempEmailUsData = error?.response?.data;
  } finally {
    return tempEmailUsData;
  }
};

export const fetchEmailUs  = async () => {
  let tempEmailUsData = [];
  
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/email-us`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempEmailUsData = response.data.allEmailUsData;
  } catch (error) {
    tempEmailUsData = error?.response?.data;
  } finally {
    return tempEmailUsData;
  }
};

export const updateEmailUs = async (emailUsData) => {
  let tempEmailUsData = [];
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/api/email-us/`,
      data: emailUsData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempEmailUsData = res.data;
    });
  } catch (error) {
    tempEmailUsData = error?.response?.data;
  } finally {
    return tempEmailUsData;
  }
};