function createdBy({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).createdAt();
}

function downTime({ id }, args, { prisma }, info) {
  return prisma.napEntry({ id }).downTime();
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
  downTime,
  asleepTime,
  wakeUpTime
};
