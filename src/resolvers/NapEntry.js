function createdBy({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).createdAt();
}

function startTime({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).startTime();
}

function asleepTime({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).asleepTime();
}

function wakeUpTime({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).wakeUpTime();
}

module.exports = {
  createdBy,
  createdAt,
  startTime,
  asleepTime,
  wakeUpTime
};
