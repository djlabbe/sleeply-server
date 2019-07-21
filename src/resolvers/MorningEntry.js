function createdBy({ id }, args, { prisma }, info) {
  return prisma.morningEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.morningEntry({ id }).createdAt();
}

function wakeUpTime({ id }, args, { prisma }, info) {
  return prisma.morningEntry({ id }).wakeUpTime();
}

function outOfBedTime({ id }, args, { prisma }, info) {
  return prisma.morningEntry({ id }).outOfBedTime();
}

module.exports = {
  createdBy,
  createdAt,
  wakeUpTime,
  outOfBedTime
};
