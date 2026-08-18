module.exports = async function sign(context) {
  // Custom no-op sign function for unsigned Windows release builds
  return Promise.resolve();
};
