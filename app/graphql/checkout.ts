import { gql } from "graphql-request";

export const GET_CART = gql`
    fragment terpeneFragment on Terpene {
        aliasList
        aromas
        description
        effects
        id
        name
        potentialHealthBenefits
        unitSymbol
    }

    fragment activeTerpeneFragment on ActiveTerpene {
        id
        terpene {
            ...terpeneFragment
        }
        name
        terpeneId
        unit
        unitSymbol
        value
    }

    fragment activeCannabinoidFragment on ActiveCannabinoid {
        cannabinoidId
        cannabinoid {
            description
            id
            name
        }
        unit
        value
    }

    fragment productFragment on Product {
        brand {
            description
            id
            imageUrl
            name
        }
        category
        description
        descriptionHtml
        effects
        enterpriseProductId
        id
        productBatchId
        image
        images {
            id
            url
            label
            description
        }
        menuTypes
        name
        slug
        posId
        potencyCbd {
            formatted
            range
            unit
        }
        potencyThc {
            formatted
            range
            unit
        }
        posMetaData {
            id
            category
            sku
        }
        staffPick
        strainType
        subcategory
        tags
        variants {
            id
            option
            priceMed
            priceRec
            specialPriceMed
            specialPriceRec
            quantity
        }
        terpenes {
            ...activeTerpeneFragment
        }
        cannabinoids {
            ...activeCannabinoidFragment
        }
    }

    fragment checkoutAdressFragment on CheckoutAddress {
        city
        deliverable
        formatted
        geometry {
            coordinates
            type
        }
        state
        street1
        street2
        valid
        zip
    }

    fragment itemFragment on Item {
        id
        errors
        option
        product {
            ...productFragment
        }
        productId
        quantity
        valid
        isDiscounted
        basePrice
        discounts {
            total
        }
        taxes {
            total
            cannabis
            sales
        }
    }

    fragment priceSummaryFragment on PriceSummary {
        discounts
        fees
        mixAndMatch
        rewards
        subtotal
        taxes
        total
    }

    fragment checkoutFragment on Checkout {
        address {
            ...checkoutAdressFragment
        }
        createdAt
        id
        items {
            ...itemFragment
        }
        orderType
        priceSummary {
            ...priceSummaryFragment
        }
        pricingType
        redirectUrl
        updatedAt
    }

    query FetchCartDetails($retailerId: ID!, $checkoutId: ID!) {
        checkout(retailerId: $retailerId, id: $checkoutId) {
            ...checkoutFragment
        }
    }
`;

export const CREATE_CHECKOUT = gql`
    fragment terpeneFragment on Terpene {
        aliasList
        aromas
        description
        effects
        id
        name
        potentialHealthBenefits
        unitSymbol
    }

    fragment activeTerpeneFragment on ActiveTerpene {
        id
        terpene {
            ...terpeneFragment
        }
        name
        terpeneId
        unit
        unitSymbol
        value
    }

    fragment activeCannabinoidFragment on ActiveCannabinoid {
        cannabinoidId
        cannabinoid {
            description
            id
            name
        }
        unit
        value
    }

    fragment productFragment on Product {
        brand {
            description
            id
            imageUrl
            name
        }
        category
        description
        descriptionHtml
        effects
        enterpriseProductId
        id
        productBatchId
        image
        images {
            id
            url
            label
            description
        }
        menuTypes
        name
        slug
        posId
        potencyCbd {
            formatted
            range
            unit
        }
        potencyThc {
            formatted
            range
            unit
        }
        posMetaData {
            id
            category
            sku
        }
        staffPick
        strainType
        subcategory
        tags
        variants {
            id
            option
            priceMed
            priceRec
            specialPriceMed
            specialPriceRec
            quantity
        }
        terpenes {
            ...activeTerpeneFragment
        }
        cannabinoids {
            ...activeCannabinoidFragment
        }
    }

    fragment checkoutAdressFragment on CheckoutAddress {
        city
        deliverable
        formatted
        geometry {
            coordinates
            type
        }
        state
        street1
        street2
        valid
        zip
    }

    fragment itemFragment on Item {
        id
        errors
        option
        product {
            ...productFragment
        }
        productId
        quantity
        valid
        isDiscounted
        basePrice
        discounts {
            total
        }
        taxes {
            total
            cannabis
            sales
        }
    }

    fragment priceSummaryFragment on PriceSummary {
        discounts
        fees
        mixAndMatch
        rewards
        subtotal
        taxes
        total
    }

    fragment checkoutFragment on Checkout {
        address {
            ...checkoutAdressFragment
        }
        createdAt
        id
        items {
            ...itemFragment
        }
        orderType
        priceSummary {
            ...priceSummaryFragment
        }
        pricingType
        redirectUrl
        updatedAt
    }

    mutation CreateCheckout(
        $retailerId: ID!
        $address: CheckoutAddressInput
        $orderType: OrderType!
        $pricingType: PricingType!
        $metadata: JSON
    ) {
        createCheckout(
            retailerId: $retailerId
            address: $address
            orderType: $orderType
            pricingType: $pricingType
            metadata: $metadata
        ) {
            ...checkoutFragment
        }
    }
`;

export const ADD_ITEM = gql`
    fragment terpeneFragment on Terpene {
        aliasList
        aromas
        description
        effects
        id
        name
        potentialHealthBenefits
        unitSymbol
    }

    fragment activeTerpeneFragment on ActiveTerpene {
        id
        terpene {
            ...terpeneFragment
        }
        name
        terpeneId
        unit
        unitSymbol
        value
    }

    fragment activeCannabinoidFragment on ActiveCannabinoid {
        cannabinoidId
        cannabinoid {
            description
            id
            name
        }
        unit
        value
    }

    fragment productFragment on Product {
        brand {
            description
            id
            imageUrl
            name
        }
        category
        description
        descriptionHtml
        effects
        enterpriseProductId
        id
        productBatchId
        image
        images {
            id
            url
            label
            description
        }
        menuTypes
        name
        slug
        posId
        potencyCbd {
            formatted
            range
            unit
        }
        potencyThc {
            formatted
            range
            unit
        }
        posMetaData {
            id
            category
            sku
        }
        staffPick
        strainType
        subcategory
        tags
        variants {
            id
            option
            priceMed
            priceRec
            specialPriceMed
            specialPriceRec
            quantity
        }
        terpenes {
            ...activeTerpeneFragment
        }
        cannabinoids {
            ...activeCannabinoidFragment
        }
    }

    fragment checkoutAdressFragment on CheckoutAddress {
        city
        deliverable
        formatted
        geometry {
            coordinates
            type
        }
        state
        street1
        street2
        valid
        zip
    }

    fragment itemFragment on Item {
        id
        errors
        option
        product {
            ...productFragment
        }
        productId
        quantity
        valid
        isDiscounted
        basePrice
        discounts {
            total
        }
        taxes {
            total
            cannabis
            sales
        }
    }

    fragment priceSummaryFragment on PriceSummary {
        discounts
        fees
        mixAndMatch
        rewards
        subtotal
        taxes
        total
    }

    fragment checkoutFragment on Checkout {
        address {
            ...checkoutAdressFragment
        }
        createdAt
        id
        items {
            ...itemFragment
        }
        orderType
        priceSummary {
            ...priceSummaryFragment
        }
        pricingType
        redirectUrl
        updatedAt
    }
    
    mutation AddItemToCheckout(
        $retailerId: ID!
        $checkoutId: ID!
        $productId: ID!
        $quantity: Int!
        $option: String!
    ) {
        addItem(
            retailerId: $retailerId
            checkoutId: $checkoutId
            productId: $productId
            quantity: $quantity
            option: $option
        ) {
            ...checkoutFragment
        }
    }
`;
