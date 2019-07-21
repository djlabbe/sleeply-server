function createdBy({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).createdAt();
}

function wakeUpTime({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).wakeUpTime();
}

function outOfBedTime({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).outOfBedTime();
}

function startTime({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).startTime();
}

function inBedTime({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).inBedTime();
}

function asleepTime({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).asleepTime();
}

module.exports = {
  createdBy,
  createdAt,
  wakeUpTime,
  outOfBedTime,
  startTime,
  inBedTime,
  asleepTime
};
