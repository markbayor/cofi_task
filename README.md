# Checkout functionality

To run this code, you will need to have yarn installed. Run the following comands:

```
yarn

yarn build     // not really necessary for testing

yarn test
```

The files in the ```data``` folder contain the info for the products and the promotions that the store can have, and they are customizable without the functionality of the checkout changing. 

```discountTypes.json``` contains info about the type of discounts that the promotions can have, which are done manually now, but could be made more complex into automatic functionality (include mathematic operators into the JSON file, mins, max, etc), but seeing as there wouldn't be many other types of discounts, I decided to keep it simple and code each of their functionality in the function itself.