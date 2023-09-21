import { uid } from '../../utils/Uid';

export const getCartItems = arg => {
  const { images, name, about, price, reviews, rating, cat_id, id, cuisine_id, user_id, ...res } = arg.servicedata;
  let arr = [...arg.cart];
  const size = arg.size;
  let index;
  if (size) {
    index = arr.findIndex(obj => obj.id === id && obj.size === size);
    console.log("runnn")
  } else {
    index = arr.findIndex(obj => obj.id === id);
  }
  const newObj = {
    id: id,
    images: JSON.parse(images),
    name: name,
    price: arg.price,
    cuisine_id: cuisine_id,
    about: about,
    size: size,
    reviews: reviews,
    rating: rating,
    cat_id: cat_id,
    user_id: user_id,
    note: arg.note,
    quantity: 1,
    cartId: uid(),
    totalPrice: Number(arg.price),
  };
  if (index === -1) {
    arr.push(newObj);
  } else {
    let newArr = [...arr];
    let obj = { ...arr[index] };
    obj.quantity = obj.quantity + 1;
    obj.totalPrice = Number(obj.totalPrice) + Number(arg.price);
    newArr.splice(index, 1, obj);
    arr = newArr;
  }
  return arr;
};
export const deletQuantityCartItems = arg => {
  let arr = [...arg.cart];
  const obj = { ...arg.item };
  let index = arr.findIndex(i => i.cartId === obj.cartId);

  // Remove the object at the specified index and replace it with a new object
  arr.splice(index, 1, {
    ...obj,
    quantity: obj.quantity - 1,
    totalPrice: Number(obj.totalPrice) - Number(obj.price),
  });
  return arr;
};
export const addQuantityCartItem = arg => {
  let arr = [...arg.cart];
  const obj = { ...arg.item };
  let index = arr.findIndex(i => i.cartId === obj.cartId);

  // Remove the object at the specified index and replace it with a new object
  arr.splice(index, 1, {
    ...obj,
    quantity: obj.quantity + 1,
    totalPrice: Number(obj.totalPrice) + Number(obj.price),
  });
  return arr;
};
export const deleteCartitem = arg => {
  let arr = [...arg.cart];
  const obj = { ...arg.item };
  let filteredArr = arr.filter(i => i.cartId !== obj.cartId);
  return filteredArr;
};
