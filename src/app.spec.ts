import {useCheckout} from "./app";

describe("useCheckout function", () => {

  const {scan, remove, total, basket} = useCheckout()

  scan("TSHIRT");
  scan("TSHIRT");
  scan("TSHIRT");
  scan("VOUCHER");
  scan("VOUCHER");
  scan("MUG");

  it("Should add scanned items to the basket basket", () => {
    expect(basket).toHaveProperty("VOUCHER", 2)
    expect(basket).toHaveProperty("MUG", 1)
    expect(basket).toHaveProperty("TSHIRT", 3)
  })

  it("Should return the total value of the items in the basket, before and after the discounts apply", () => {
    expect(total().preDiscount).toBe(77.5)
    expect(total().postDiscount).toBe(69.5)
  })

  it("Should be able to remove items one by one", () => {
    remove("MUG");
    expect(basket).not.toHaveProperty("MUG", 1)

    remove("VOUCHER");
    expect(basket).toHaveProperty("VOUCHER", 1)
  })

  it("Should get the correct totals after the removal", () => {
    expect(total().preDiscount).toBe(65)
    expect(total().postDiscount).toBe(62)
  })
})