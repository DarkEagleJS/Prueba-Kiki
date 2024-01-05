import { useContext } from "react";
import { ShipmentContext } from "./ShipmentContext";

export const useShipments = () => {
  const context = useContext(ShipmentContext);
  if (!context) throw new Error("useShipments must be used within a ShipmentProvider");
  return context;
};