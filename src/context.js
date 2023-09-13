import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if(selectedData._id) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [selectedData]);
  const openModal = (data) => {
    if(data) {
      setSelectedData(data);
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setSelectedData({});
  };

  return (
    <DataContext.Provider
      value={{ selectedData, isModalVisible, openModal, closeModal }}
    >
      {children}
    </DataContext.Provider>
  );
};
