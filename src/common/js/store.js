/**
 * Created by haoguoliang on 2017/7/9.
 */
export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
    seller[id][key] = val;
  }
  window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  } else {
    seller = JSON.parse(seller)[id];
    if (!seller) {
      return def;
    }
    return seller[key] || def;
  }
}
