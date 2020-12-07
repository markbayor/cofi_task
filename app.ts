/*
  Products:
  - Voucher: 5 €
  - Tshirt: 20 €
  - Mug: 7.5 €

  VOUCHER items have a 2 for 1 offer.
  TSHIRT items have a 1 € reduction on unit price when buying 3 or more.

*/

import products from "./data/products.json";
import promotions from "./data/promotions.json";
import discountTypes from "./data/discountTypes.json"

type ProductKey = keyof typeof products; // the SKUs for each product from the json file.
type PromotionType = keyof typeof promotions; // Object for each promotion that we add to the store, with the type of discount and object it applies to.
type DiscountTypeKey = keyof typeof discountTypes; // type of discount, where it explains how each works and describes the params. If made more complex,
                                                   // it could be used to create discounts automatically (like 3 for 1, etc) according to more parameters, but I wanted to keep it simple for now.

const applyAllPromotionsAutomatically = (basket: Partial<{[key in ProductKey]: number;}>, total: number) => {
  for (const prod in basket) { 
    const currProdPrice = products[<ProductKey>prod].price
    if (basket[<ProductKey>prod] !== undefined) {
      for (const promo in promotions) { 
        const currPromo = promotions[<PromotionType>promo]

        if (prod === currPromo.productKey) { // for each product we search for promotions that apply to it
          switch (currPromo.discount.type) {
            case "bogof":
              // @ts-ignore Same error as in line 34.
              total -= Math.floor(basket[<ProductKey>prod] / 2) * currProdPrice
              console.log("TOTAL", total)
              return total
            case "bulk":
              // @ts-ignore Same error as in line 34.
              if (currPromo.discount.minAmount && basket[<ProductKey>prod] >= currPromo.discount.minAmount) {
                // @ts-ignore Same error as in line 34.
                total -= basket[<ProductKey>prod] * currPromo.discount.discountPerUnit
              }
              return total
          }
        }
      }
    }
  }
}

const useCheckout = () => {
  const basket: Partial<{[key in ProductKey]: number;}> = {};

  const scan = (prodName: ProductKey) => {
    // @ts-ignore Some weird error. Typescript gives me the error for basket[prodName] where
    // "Object is possibly undefined" when it clearly isn't, and the functionality still works.
    if (basket[prodName] !== undefined) basket[prodName] += 1;
    else {
      basket[prodName] = 1;
    }
  }

  const total = () => {
    let preTotal = 0;
    for (const prod in basket) {
      // @ts-ignore Same error as in line 34.
      preTotal += products[<ProductKey>prod].price * basket[<ProductKey>prod]
    }

    const total = applyAllPromotionsAutomatically(basket, preTotal)

    return total
  }

  return {scan, total};
}

export {useCheckout}