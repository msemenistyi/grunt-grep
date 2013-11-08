function forEach(obj, iterator, context) {
  var key; //@grep minute:s  
  if (obj) {
    if (isFunction(obj)){
      for (key in obj) {
        if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {//@grep minute:e
          iterator.call(context, obj[key], key);
        }
      }//@grep second:s
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context);
    } else if (isArrayLike(obj)) {//@grep second:e
      for (key = 0; key < obj.length; key++)
        iterator.call(context, obj[key], key);//@grep minute
    } else {
      for (key in obj) {// @grep second
        if (obj.hasOwnProperty(key)) {//@grep hour:s
          iterator.call(context, obj[key], key);
        }//@grep hour:e
      }
    }//@grep hour
  }
  return obj;
}