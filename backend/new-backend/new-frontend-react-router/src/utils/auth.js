import localforage from "localforage";

export async function getUser() {
  try {
    const user = await localforage.getItem("user");
    console.log("user", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}