import bcrypt from 'bcrypt';
import CredentialModel from '../models/credentials.model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function signup(req: Request, res: Response) {
  const { username, password } = req.body;
  console.log(req.body);

  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      CredentialModel.create({
        username: username,
        password: hash,
      })
        .then(() => {
          res.status(200).json({ message: 'Credentials created' });
          //   EmployeeModel.create({
          //     email: req.body.email,
          //     name: req.body.name,
          //     surname: req.body.surname,
          //     birth_date: req.body.birth_date,
          //     gender: req.body.gender,
          //     work: req.body.work,
          //   })
          //     .then(() => {
          //       res.status(200).json({ message: 'Employee created' });
          //     })
          //     .catch(error => {
          //       res.status(500).json(error);
          //     });
        })
        .catch(err => {
          res.status(100).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export function login(req: Request, res: Response) {
  console.log(req.body);
  CredentialModel.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user == null) {
        res.status(401).json({ message: 'Incorrect.' });
      } else {
        bcrypt
          .compare(req.body.password, user.toJSON().password)
          .then(valid => {
            if (!valid) {
              res
                .status(401)
                .json({ message: 'Identifiant ou mot de passe incorrect' });
            } else {
              res.status(200).json({
                userId: user?.toJSON().id,
                token: jwt.sign(
                  { userId: user?.toJSON().id },
                  process.env.JWT_SECRET || '123',
                  {
                    expiresIn: '5h',
                  },
                ),
              });
              //   EmployeeModel.findOne({ where: { email: req.body.email } })
              //     .then(employee => {
              //       res.status(200).json({
              //         userId: employee?.toJSON().id,
              //         token: jwt.sign({ userId: employee?.toJSON().id }, '123', {
              //           expiresIn: '5h',
              //         }),
              //       });
              //     })
              //     .catch(error => {
              //       res.status(400).json(error);
              //     });
            }
          })
          .catch(err => res.status(500).json({ error: err }));
      }
    })
    .catch(err => res.status(500).json({ error: err }));
}
