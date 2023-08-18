import { gql } from "graphql-request";

export const GET_PRODUCT = gql`
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

    fragment variantFragment on ProductVariant {
        id
        option
        priceMed
        priceRec
        specialPriceMed
        specialPriceRec
        quantity
        flowerEquivalent {
            unit
            value
        }
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
            ...variantFragment
        }
        terpenes {
            ...activeTerpeneFragment
        }
        cannabinoids {
            ...activeCannabinoidFragment
        }
    }

    query ProductQuery($retailerId: ID!, $productId: ID!) {
        product(retailerId: $retailerId, id: $productId) {
            ...productFragment
        }
    }
`;
