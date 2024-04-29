import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [item, setItem] = React.useState(null);
  const [requestItem, setRequestItem] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [info, setInfo] =useState(null);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);


  const updateItem = (newItem) => {
    setItem(newItem);
  };
  const updateRequestItem = (newItem) => {
    setRequestItem(newItem);
  };
  const updateDetails = (newItem) => {
    setUserDetails(newItem);
  };
  const updateBillDetails = (newItem) => {
    setBillDetails(newItem);
  };
  const updatePatientDetails = (newItem) => {
    setPatientDetails(newItem);
  };
  const updateInfo = (newItem) => {
    setInfo(newItem);
  };
  const updateDiscount = (newItem) => {
    setDiscountDetails(newItem);
  };
  const updateEmployeeDetails = (newItem) => {
    setEmployeeDetails(newItem);
  };
  const updateRequestDetails = (newItem) => {
    setRequestDetails(newItem);
  };
  return (
    <AppContext.Provider
        value={{ item,
           updateItem, 
           requestItem,
           updateRequestItem,
           userDetails,
           updateDetails,
           billDetails,
           updateBillDetails,
           info,
           updateInfo,
           discountDetails,
           updateDiscount,
           patientDetails,
           updatePatientDetails,
           employeeDetails,
           updateEmployeeDetails,
           requestDetails,
           updateRequestDetails
           }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
