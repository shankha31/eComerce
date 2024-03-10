export function addToWishlist(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWishlistItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist");
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromWishlist(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

// export function resetCart() {
//   // get all items of user's cart - and then delete each
//   return new Promise(async (resolve) => {
//     const response = await fetchItemsByUserId();
//     const items = response.data;
//     for (let item of items) {
//       await deleteItemFromCart(item.id);
//     }
//     resolve({ status: "success" });
//   });
// }
