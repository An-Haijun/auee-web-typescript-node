class User {
    _sequelize: any = {};
    Sequelize: any = {};
    constructor(sequelize: any, Sequelize: any) {
        this._sequelize = sequelize;
        this.Sequelize = Sequelize;
    }
    create() {
        const pet = this._sequelize.define("pet", {
            id: {
                type: this.Sequelize.STRING(50),
                primaryKey: true
            },
            name: this.Sequelize.STRING(100),
            gender: this.Sequelize.BOOLEAN,
            birth: this.Sequelize.STRING(10),
            createdAt: this.Sequelize.BIGINT,
            updatedAt: this.Sequelize.BIGINT,
            version: this.Sequelize.BIGINT
        }, {
            timestamps: false
        });

        return pet;
    }
}

export default User;
