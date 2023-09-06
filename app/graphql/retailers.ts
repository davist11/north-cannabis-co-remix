import { gql } from "graphql-request";

export const GET_RETAILERS = gql`
    fragment addressFragment on AddressObject {
        line1
        line2
        city
        postalCode
        state
        country
    }

    fragment bannerColorsFragment on BannerColorConfiguration {
        background
        border
        color
        id
    }

    fragment deliverySettingsFragment on DeliverySettings {
        afterHoursOrderingForDelivery
        afterHoursOrderingForPickup
        deliveryArea
        deliveryFee
        deliveryMinimum
        disablePurchaseLimits
        limitPerCustomer
        pickupMinimum
        scheduledOrderingForDelivery
        scheduledOrderingForPickup
    }

    fragment hoursDayFragment on HoursDay {
        active
        start
        end
    }

    fragment hoursFragment on Hours {
        Sunday {
            ...hoursDayFragment
        }
        Monday {
            ...hoursDayFragment
        }
        Tuesday {
            ...hoursDayFragment
        }
        Wednesday {
            ...hoursDayFragment
        }
        Thursday {
            ...hoursDayFragment
        }
        Friday {
            ...hoursDayFragment
        }
        Saturday {
            ...hoursDayFragment
        }
    }

    fragment retailerFragment on Retailer {
        address
        addressObject {
            ...addressFragment
        }
        banner {
            colors {
                ...bannerColorsFragment
            }
            html
        }
        # categoryLimits {
        #   name
        #   value
        # }
        coordinates {
            latitude
            longitude
        }
        deliverySettings {
            ...deliverySettingsFragment
        }
        description
        fulfillmentOptions {
            curbsidePickup
            delivery
            driveThruPickup
            pickup
        }
        hours {
            delivery {
                ...hoursFragment
            }
            pickup {
                ...hoursFragment
            }
            regular {
                ...hoursFragment
            }
            specialHours {
                startDate
                endDate
                specialOperatingHours {
                    date
                    curbsidePickup {
                        ...hoursDayFragment
                    }
                    delivery {
                        ...hoursDayFragment
                    }
                    driveThruPickup {
                        ...hoursDayFragment
                    }
                    pickup {
                        ...hoursDayFragment
                    }
                }
                name
            }
        }
        id
        menuTypes
        name
        paymentMethodsByOrderTypes {
            orderType
            paymentMethods
        }
        settings {
            menuWeights
        }
    }

    query RetailersQuery {
        retailers {
            ...retailerFragment
        }
    }
`;

export const GET_RETAILER = gql`
    fragment addressFragment on AddressObject {
        line1
        line2
        city
        postalCode
        state
        country
    }

    fragment bannerColorsFragment on BannerColorConfiguration {
        background
        border
        color
        id
    }

    fragment deliverySettingsFragment on DeliverySettings {
        afterHoursOrderingForDelivery
        afterHoursOrderingForPickup
        deliveryArea
        deliveryFee
        deliveryMinimum
        disablePurchaseLimits
        limitPerCustomer
        pickupMinimum
        scheduledOrderingForDelivery
        scheduledOrderingForPickup
    }

    fragment hoursDayFragment on HoursDay {
        active
        start
        end
    }

    fragment hoursFragment on Hours {
        Sunday {
            ...hoursDayFragment
        }
        Monday {
            ...hoursDayFragment
        }
        Tuesday {
            ...hoursDayFragment
        }
        Wednesday {
            ...hoursDayFragment
        }
        Thursday {
            ...hoursDayFragment
        }
        Friday {
            ...hoursDayFragment
        }
        Saturday {
            ...hoursDayFragment
        }
    }

    fragment retailerFragment on Retailer {
        address
        addressObject {
            ...addressFragment
        }
        banner {
            colors {
                ...bannerColorsFragment
            }
            html
        }
        # categoryLimits {
        #   name
        #   value
        # }
        coordinates {
            latitude
            longitude
        }
        deliverySettings {
            ...deliverySettingsFragment
        }
        description
        fulfillmentOptions {
            curbsidePickup
            delivery
            driveThruPickup
            pickup
        }
        hours {
            delivery {
                ...hoursFragment
            }
            pickup {
                ...hoursFragment
            }
            regular {
                ...hoursFragment
            }
            specialHours {
                startDate
                endDate
                specialOperatingHours {
                    date
                    curbsidePickup {
                        ...hoursDayFragment
                    }
                    delivery {
                        ...hoursDayFragment
                    }
                    driveThruPickup {
                        ...hoursDayFragment
                    }
                    pickup {
                        ...hoursDayFragment
                    }
                }
                name
            }
        }
        id
        menuTypes
        name
        paymentMethodsByOrderTypes {
            orderType
            paymentMethods
        }
        settings {
            menuWeights
        }
    }

    query RetailerQuery($retailerId: ID!) {
        retailer(id: $retailerId) {
            ...retailerFragment
        }
    }
`;
