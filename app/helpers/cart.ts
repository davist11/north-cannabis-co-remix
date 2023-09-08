export const formatPrice = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(value);

type OrderType = {
    name: string;
    value: string;
    selected?: boolean;
};

export const orderTypes: OrderType[] = [
    {
        name: "Curbside Pickup",
        value: "CURBSIDE_PICKUP",
    },
    {
        name: "Delivery",
        value: "DELIVERY",
    },
    {
        name: "Drive Thru Pickup",
        value: "DRIVE_THRU_PICKUP",
    },
    {
        name: "In Store Pickup",
        value: "IN_STORE_PICKUP",
    },
    {
        name: "Pickup",
        value: "PICKUP",
    },
    {
        name: "Kiosk",
        value: "KIOSK",
        selected: true,
    },
];

export const getOrderType = (orderType: string): string =>
    orderTypes.find(({ value }) => value === orderType)?.name ?? "";
