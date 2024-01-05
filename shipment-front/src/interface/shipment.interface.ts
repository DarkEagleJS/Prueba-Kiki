export interface Shipment {
    _id: string;
    title: string;
    description?: string;
    done?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CreateShipment = Omit<Shipment, "_id" | "createdAt" | "updatedAt">;

export type UpdateShipment = Partial<CreateShipment>;