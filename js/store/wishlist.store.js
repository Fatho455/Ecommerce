const WISHLIST_KEY = "ec_wishlist";

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function addToWishlist(product) {
  const list = getWishlist();
  if (!list.find((i) => i.id === product.id)) {
    list.push(product);
    saveWishlist(list);
    showToast("Item added to your Wishlist.", "info");
  }
}

function removeFromWishlist(id) {
  let list = getWishlist();
  list = list.filter((i) => i.id !== id);
  saveWishlist(list);
}

function isInWishlist(id) {
  return getWishlist().some((i) => i.id === id);
}

function toggleWishlist(product) {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
    showToast("Removed from Wishlist.", "info");
    return false;
  } else {
    addToWishlist(product);
    return true;
  }
}