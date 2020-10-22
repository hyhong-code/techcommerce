export default (error) =>
  error.response.data.errors.map((e) => e.msg).join(" ");
