function createdBy(parent, args, context) {
  return context.prisma.logEntry({ id: parent.id }).createdBy();
}

module.exports = {
  createdBy
};
