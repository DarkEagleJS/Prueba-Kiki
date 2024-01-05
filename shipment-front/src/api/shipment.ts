import { CreateShipment, UpdateShipment } from "../interface/shipment.interface";

const API = "http://localhost:3000/api";

export const getShipmentsRequest = async () => fetch(`${API}/shipments`);

export const createShipmentRequest = async (task: CreateShipment) =>
  fetch(`${API}/shipments`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteShipmentRequest = async (id: string) =>
  fetch(`${API}/shipments/${id}`, {
    method: "DELETE",
  });

export const updateShipmentRequest = async (id: string, shipment: UpdateShipment) =>
  fetch(`${API}/shipments/${id}`, {
    method: "PUT",
    body: JSON.stringify(shipment),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getShipmentRequest = async (id: string) => fetch(`${API}/shipments/${id}`);