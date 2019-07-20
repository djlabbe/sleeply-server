function parent({ id }, args, { prisma }) {
  return prisma.child({ id }).parent();
}

module.exports = {
  parent
};
