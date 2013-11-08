function forEach(obj, iterator, context) {
          iterator.call(context, obj[key], key);
        }
      for (key = 0; key < obj.length; key++)
    } else {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    }
  }
  return obj;
}