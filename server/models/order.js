'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('orders', {
    id_customer: DataTypes.INTEGER,
    id_room: DataTypes.INTEGER,
    is_done:DataTypes.STRING,
    is_booked: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.customers,{
      as: 'customerData',
      foreignKey: 'id_customer', 
    });
    order.belongsTo(models.rooms,{
      as: 'roomData',
      foreignKey: 'id_room', 
    })
  };
  return order;
};