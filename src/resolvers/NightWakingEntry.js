function createdBy({ id }, args, { prisma }, info) {
  return prisma.nightWakingEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.nightWakingEntry({ id }).createdAt();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.nightWakingEntry({ id }).createdAt();
}

function wakeUpTime({ id }, args, { prisma }, info) {
  return prisma.nightWakingEntry({ id }).wakeUpTime();
}

function asleepTime({ id }, args, { prisma }, info) {
  return prisma.nightWakingEntry({ id }).asleepTime();
}

module.exports = {
  createdBy,
  createdAt,
  wakeUpTime,
  asleepTime
};
