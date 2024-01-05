import { createContext, useEffect, useState } from "react";
import { CreateShipment, Shipment, UpdateShipment } from "../interface/shipment.interface";
import {
  createShipmentRequest,
  deleteShipmentRequest,
  getShipmentsRequest,
  updateShipmentRequest,
} from "../api/shipment";

interface ShipmentContextValue {
  shipments: Shipment[];
  createShipment: (shipment: CreateShipment) => Promise<void>;
  deleteShipment: (id: string) => Promise<void>;
  updateShipment: (id: string, shipment: UpdateShipment) => Promise<void>;
}

export const ShipmentContext = createContext<ShipmentContextValue>({
  shipments: [],
  createShipment: async () => {
    throw new Error("createShipment() not implemented");
  },
  deleteShipment: async () => {
    throw new Error("deleteShipment() not implemented");
  },
  updateShipment: async () => {
    throw new Error("updateShipment() not implemented");
  },
});

interface Props {
  children: React.ReactNode;
}

export const ShipmentProvider: React.FC<Props> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    getShipmentsRequest()
      .then((response) => response.json())
      .then((data) => setShipments(data));
  }, []);

  const createShipment = async (task: CreateShipment) => {
    const response = await createShipmentRequest(task);
    const data = await response.json();
    setShipments([...shipments, data]);
  };

  const deleteShipment = async (id: string) => {
    const response = await deleteShipmentRequest(id);
    console.log(response)
    if (response.status === 204) {
      setShipments(shipments.filter((task) => task._id !== id));
    }
  };

  const updateShipment = async (id: string, task: UpdateShipment) => {
    const response = await updateShipmentRequest(id, task);
    const data = await response.json();
    console.log(data)
    setShipments(
      shipments.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  return (
    <ShipmentContext.Provider value={{ shipments, createShipment, deleteShipment, updateShipment }}>
      {children}
    </ShipmentContext.Provider>
  );
};