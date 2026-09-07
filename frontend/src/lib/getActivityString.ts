function getActionString(action: string) {
  switch (action) {
    case "crt":
      return "created";
    case "upd":
      return "updated";
    case "del":
      return "deleted";
    case "joi":
      return "joined";
    case "lve":
      return "left";
    default:
      return "";
  }
}

function getModuleString(module: string) {
  switch (module) {
    case "usr":
      return "user";
    case "grp":
      return " a group";
    case "exp":
      return "an expense";
    case "set":
      return "a settlement";
    case "pay":
      return "the payment";
    case "spl":
      return "the split";
    default:
      return "";
  }
}

export function getActivityString(
  module: string,
  action: string,
  username: string,
) {
  return username.concat(
    " ",
    getActionString(action),
    " ",
    getModuleString(module),
  );
}
