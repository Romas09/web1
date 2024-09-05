const sequelize =require('../db')
const {DataTypes} = require('sequelize')

const User =sequelize.define('user', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, allowNull: true},
    tel: {type: DataTypes.STRING, allowNull: true},
    fio: {type: DataTypes.STRING, allowNull: true},
    date:{type: DataTypes.STRING, allowNull: true},
    bonus:{type: DataTypes.INTEGER, defaultValue: 500},
    role: {type:DataTypes.STRING, defaultValue: "USER"},
})
const Bonus =sequelize.define('bonus', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    iduser: {type: DataTypes.INTEGER, allowNull: false},
    bonus: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.STRING, allowNull: false},
})


const Basket =sequelize.define('basket', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketDevice =sequelize.define('basket_device', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER,  allowNull: false},
    sum: {type: DataTypes.INTEGER,  allowNull: false},
    device_id:{ type: DataTypes.INTEGER, allowNull: false  },
    basket_id:{ type: DataTypes.INTEGER },
    type_id:{ type: DataTypes.INTEGER, allowNull: false  },
    band_id:{ type: DataTypes.INTEGER,allowNull: false  }

})

const FavouritesDevice =sequelize.define('favourites_device', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_id:{ type: DataTypes.INTEGER, allowNull: false  },
    user_id:{ type: DataTypes.INTEGER, allowNull: false }

})

const Device =sequelize.define('device', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    count: {type: DataTypes.INTEGER,  allowNull: false},
    price: {type: DataTypes.INTEGER,  allowNull: false},
    rating: {type: DataTypes.FLOAT,  allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
})
const DeviceInfo =sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const ImageGallery =sequelize.define('device_image_gallery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Order =sequelize.define('order', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.STRING,  allowNull: false},
    delivery: {type: DataTypes.STRING,  allowNull: false},
    adres: {type: DataTypes.STRING, },
    fio: {type: DataTypes.STRING, allowNull: false},
    tel: {type: DataTypes.STRING,  allowNull: false},
    email: {type: DataTypes.STRING,  allowNull: false},
    promo: {type: DataTypes.STRING,  },
    bonus: {type: DataTypes.INTEGER,  },
    itog_sum: {type: DataTypes.INTEGER,  allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
})
const OrderDevice =sequelize.define('orderdevice', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_id: {type: DataTypes.INTEGER,  allowNull: false},
    device_count: {type: DataTypes.INTEGER, },
    device_sum: {type: DataTypes.INTEGER,  allowNull: false},
})


const Type =sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})



const PrototypeDeviceInfo =sequelize.define('prototype_device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    type_id: {type: DataTypes.INTEGER, allowNull: false}
})
const News =sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    img_glav: {type: DataTypes.STRING, allowNull: false},
    img_font: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false}
})

const Sales =sequelize.define('sales', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    img_glav: {type: DataTypes.STRING, allowNull: false},
    img_font: {type: DataTypes.STRING, allowNull: false},
    date_start: {type: DataTypes.STRING, allowNull: false},
    date_end: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, }
})
const Review =sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    plus: {type: DataTypes.TEXT, allowNull: false},
    minus: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    date_use: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.STRING, allowNull: false},
    recomend: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    bonus: {type: DataTypes.INTEGER}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const PromoCode =sequelize.define('promocode', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    procent: {type: DataTypes.INTEGER,  allowNull: false},
    min_sum: {type: DataTypes.INTEGER,  allowNull: false},
    type_id:{ type: DataTypes.INTEGER },
    band_id:{ type: DataTypes.INTEGER },
    date_start:{ type: DataTypes.STRING,allowNull: false },
    date_end:{ type: DataTypes.STRING,allowNull: false}

})



Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)
Device.hasMany(ImageGallery, {as: 'gallery'})
ImageGallery.belongsTo(Device)

Device.hasMany(Review, {as: 'review'})
Review.belongsTo(Device)

Order.hasMany(OrderDevice, {as: 'orderdevice'})
OrderDevice.belongsTo(Order)

Type.belongsToMany(Brand, {through: TypeBrand } )
Brand.belongsToMany(Type, {through: TypeBrand } )

/*Type.hasMany(PromoCode);
PromoCode.belongsTo(Type);

Brand.hasMany(PromoCode);
PromoCode.belongsTo(Brand);*/

module.exports = {
    User,
    Bonus,
    Basket,
    BasketDevice,
    FavouritesDevice,
    Device,
    Type,
    Brand,
    TypeBrand,
    DeviceInfo,
    Review,
    PromoCode,
    PrototypeDeviceInfo,
    Order,
    OrderDevice,
    News,
    Sales,
    ImageGallery,
    }









