import { gql } from "graphql-request";

export const GET_MENU = gql`
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
            # quantity
        }
        terpenes {
            ...activeTerpeneFragment
        }
        cannabinoids {
            ...activeCannabinoidFragment
        }
    }

    query MenuQuery($retailerId: ID!, $filter: MenuFilter, $pagination: Pagination) {
        menu(retailerId: $retailerId, filter: $filter, pagination: $pagination) {
            products {
                ...productFragment
            }
        }
    }
`;
