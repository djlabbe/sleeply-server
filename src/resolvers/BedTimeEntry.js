function createdBy({ id }, args, { prisma }, info) {
  return prisma.bedTimeEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.bedTimeEntry({ id }).createdAt();
}

function startTime({ id }, args, { prisma }, info) {
  return prisma.bedTimeEntry({ id }).startTime();
}

function inBedTime({ id }, args, { prisma }, info) {
  return prisma.bedTimeEntry({ id }).inBedTime();
}

function asleepTime({ id }, args, { prisma }, info) {
  return prisma.bedTimeEntry({ id }).asleepTime();
}

module.exports = {
  createdBy,
  createdAt,
  startTime,
  inBedTime,
  asleepTime
};
