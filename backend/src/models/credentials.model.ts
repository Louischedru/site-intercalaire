import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const CredentialModel = sq.define('credential', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

CredentialModel.sync().then(() => console.log('Credential table created.'));

export default CredentialModel;
